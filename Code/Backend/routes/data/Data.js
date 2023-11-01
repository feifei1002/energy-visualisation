//Define libraries
const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const fs = require('fs');
const Papa = require('papaparse');

// Create a cache for the annual heat data (cached for one day)
const annualHeatCache = new NodeCache({ stdTTL: 24 * 60 * 60 }); // Cache data for one day (in seconds)

//Get csv file from project root
const path = require('path');
const rootPath = path.join(__dirname, '../../../'); 
const annualHeatFilePath = path.join(rootPath, 'Data', 'Annual_heat_demand_LSOA_EnglandWales.csv');

// Define an API endpoint to get the CSV data
router.get('/annualheat', (req, res) => {
  // Cache key for CSV data
  const dataKey = "annualHeatData";

  // Check if the data is already in the cache
  const cachedData = annualHeatCache.get(dataKey);

  if (cachedData) {
    // CSV data is in the cache; use the cached data
    console.log("Using cached CSV data");
    res.json(cachedData);
  } else {
    // Read the CSV file
    fs.readFile(annualHeatFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading CSV data' });
      } else {
        // Parse the CSV data
        Papa.parse(data, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: function (results) {
            // Cache the parsed data and respond
            annualHeatCache.set(dataKey, results.data);
            res.json(results.data);
          },
          error: function (error) {
            console.error('CSV Parsing Error:', error.message);
            res.status(500).json({ error: 'Error parsing CSV data' });
          },
        });
      }
    });
  }
});

// Export the router
module.exports = router;