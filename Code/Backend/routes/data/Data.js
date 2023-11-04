// Import required libraries
const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const fs = require('fs').promises; // Using Promises for file operations
const Papa = require('papaparse');

// Define the time-to-live (TTL) for caching in seconds (one day)
const cacheTTL = 24 * 60 * 60; 

// Import the path library to work with file paths
const path = require('path');

// Create caches for different types of CSV data
const annualHeatCache = new NodeCache({ stdTTL: cacheTTL });
const quantificationCache = new NodeCache({ stdTTL: cacheTTL });
const residentialHeatDemandCache = new NodeCache({ stdTTL: cacheTTL });

// Define the root path for the project
const rootPath = path.join(__dirname, '../../../');

// Define file paths for different types of CSV data
const csvPaths = {
  annualHeat: path.join(rootPath, 'Data', 'Annual_heat_demand_LSOA_EnglandWales.csv'),
  quantification: path.join(rootPath, 'Data', 'Quantification_of_inherent_flexibility.csv'),
  residentialHeatDemand: path.join(rootPath, 'Data', 'Residential_heat_demand_LSOA_Scotland.csv'),
};

const geojsonPath = path.join(rootPath, 'Data', 'lsoa.geojson')

// Function to parse and cache CSV data
async function parseAndCacheCSV(dataKey, cache, data, res) {
  try {
    const results = await new Promise((resolve, reject) => {
      // Use PapaParse to parse the CSV data
      Papa.parse(data, {
        header: true,          // Treat the first row as headers
        dynamicTyping: true,   // Automatically convert data types
        skipEmptyLines: true,  // Skip empty lines
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });

    // Cache the parsed data and send it as a JSON response
    cache.set(dataKey, results);
    res.json(results);
  } catch (error) {
    // Handle errors in parsing and respond with an error message
    console.error('CSV Parsing Error:', error.message);
    res.status(500).json({ error: 'Error parsing CSV data' });
  }
}

// Function to handle CSV data requests
async function handleCSVRequest(req, res, dataKey, cache, filePath) {
  const cachedData = cache.get(dataKey);

  if (cachedData) {
    // If data is in the cache, use the cached data and respond
    console.log("Using cached CSV data");
    res.json(cachedData);
  } else {
    try {
      // Read the CSV data from the file
      const data = await fs.readFile(filePath, 'utf8');
      // Parse and cache the CSV data, then send it as a JSON response
      await parseAndCacheCSV(dataKey, cache, data, res);
    } catch (error) {
      // Handle errors in reading or parsing data and respond with an error message
      console.error(error);
      res.status(500).json({ error: 'Error reading or parsing CSV data' });
    }
  }
}

// Define API endpoints to get different types of CSV data

// API endpoint for annual heat data
router.get('/annualheat', (req, res) => {
  handleCSVRequest(req, res, 'annualHeatData', annualHeatCache, csvPaths.annualHeat);
});

// API endpoint for quantification data
router.get('/quantification', (req, res) => {
  handleCSVRequest(req, res, 'quantificationData', quantificationCache, csvPaths.quantification);
});

// API endpoint for residential heat demand data
router.get('/residentialheat', (req, res) => {
  handleCSVRequest(req, res, 'residentialHeatDemandData', residentialHeatDemandCache, csvPaths.residentialHeatDemand);
});

// API endpoint for geojson data
router.get('/geojson', async (req, res) => {
  try {
    // Read the GeoJSON data from the file
    const geojsonData = await fs.readFile(geojsonPath, 'utf8');
    // Parse the GeoJSON data as JSON and send it as a response
    res.json(JSON.parse(geojsonData));
  } catch (error) {
    // Handle errors in reading the GeoJSON file and respond with an error message
    console.error(error);
    res.status(500).json({ error: 'Error reading GeoJSON data' });
  }
});


// Export the router
module.exports = router;