const express = require('express');
const router = express.Router();
const { processHeatDemandData } = require('../../utils/heatdemandProcessor');

router.get('/summary', async (req, res) => {
    try {
        const data = await processHeatDemandData();
        res.json(data);
    } catch (error) {
        res.status(500).send('Server error');
        console.log(error);
    }
});

module.exports = router;
