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

        //parse the pageUrl to extract the pathname and query
        const parsedUrl = new URL(pageUrl, 'http://localhost'); //fallback base URL in case of relative URLs
        const pathWithQuery = parsedUrl.pathname + (parsedUrl.search ? parsedUrl.search : '');

        //prepare the event data, adding the country field
        const eventData = {
            userId: req.body.userId || 'defaultUserId',
            event,
            location,
            country,
            pageUrl: pathWithQuery,
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
            {
                $match: {
                    event: { $in: ["PageView", "DataView"] }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: { $toDate: "$timestamp" } },
                        month: { $month: { $toDate: "$timestamp" } },
                        pageUrl: "$pageUrl",
                        eventType: "$event"
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.pageUrl": 1, "_id.eventType": 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving analytics data');
    }
});




//endpoint to get analytics data by country and year
router.get('/analytics/by-country', async (req, res) => {
    const year = parseInt(req.query.year);
    const month = parseInt(req.query.month); //get the month from the query, if we get given it

    let matchCondition = {
        event: "DataView",
        timestamp: {
            $gte: new Date(`${year}-01-01T00:00:00.000Z`),
            $lte: new Date(`${year}-12-31T23:59:59.999Z`)
        }
    };

    //modify the match condition if a specific month is provided
    if (month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);
        matchCondition.timestamp.$gte = startDate;
        matchCondition.timestamp.$lte = endDate;
    }

    try {
        const data = await AnalyticLog.aggregate([
            { $match: matchCondition },
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
