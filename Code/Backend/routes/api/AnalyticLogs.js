const express = require('express');
const router = express.Router();
const AnalyticLog = require('../../models/Analytics');
const {expressjwt} = require("express-jwt");
const { convertLatLongToCountry } = require('../../utils/analyticsProcessor');


//POST route to create a new analytic log entry
router.post('/analyticlog/', async (req, res) => {
    try {
        const { event, location, pageUrl, additionalDetails } = req.body;

        //extract latitude and longitude from the location
        const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

        //convert latitude and longitude to country
        const country = await convertLatLongToCountry(latitude, longitude);

        //prepare the event data, adding the country field
        const eventData = {
            //assuming userId is available in the request body or through authentication context
            userId: req.body.userId || 'defaultUserId',
            event,
            location,
            country, //add the country name to the event data
            pageUrl,
            additionalDetails
        };

        const newLog = new AnalyticLog(eventData);
        await newLog.save();

        res.status(201).json({ message: 'Analytics log created', logId: newLog._id });
    } catch (error) {
        console.error('Error creating analytic log:', error);
        res.status(500).json({ message: 'Error creating analytic log' });
    }
});

router.get('/analytics/pageviews-per-month', async (req, res) => {
    try {
        const data = await AnalyticLog.aggregate([
            { $match: { event: "PageView" } },
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        pageUrl: "$pageUrl"
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.pageUrl": 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving analytics data');
    }
});



//endpoint to get analytics data by country and year
router.get('/analytics/by-country', async (req, res) => {
    const year = parseInt(req.query.year);
    try {
        const data = await AnalyticLog.aggregate([
            { $match: { event: "DataView", "timestamp": { $gte: new Date(`${year}-01-01T00:00:00.000Z`), $lte: new Date(`${year}-12-31T23:59:59.999Z`) } } },
            {
                $group: {
                    _id: {
                        country: "$country",
                        pageUrl: "$pageUrl"
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.country": 1, "_id.pageUrl": 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving analytics data');
    }
});


module.exports = router;
