// Import required libraries
const express = require('express'); // Import the Express framework for building web applications
const router = express.Router(); // Create a new router object to handle routes
const NodeCache = require('node-cache'); // Import the caching library to cache data in memory
const Papa = require('papaparse'); // Import the Papaparse library for parsing CSV files
const fs = require('fs').promises; // Import the file system promises API for reading/writing files asynchronously
const compression = require('compression'); // Import the compression middleware for compressing response data

// Define the time-to-live (TTL) for caching in seconds (one day)
const cacheTTL = 24 * 60 * 60; 

// Import the path library to work with file system paths
const path = require('path');
const {processHeatDemandData} = require("../../utils/heatDemandProcessor");

// Create caches for different types of CSV data with a standard TTL
const annualHeatCache = new NodeCache({ stdTTL: cacheTTL });
const quantificationCache = new NodeCache({ stdTTL: cacheTTL });
const residentialHeatDemandCache = new NodeCache({ stdTTL: cacheTTL });
// const halfHourlyProfileHeatingCache = new NodeCache({ stdTTL: cacheTTL });

// Define the root path for the project relative to the current file
const rootPath = path.join(__dirname, '../../../');

// Define file paths for different types of CSV data using the root path
const csvPaths = {
  annualHeat: path.join(rootPath, 'Data', 'Annual_heat_demand_LSOA_EnglandWales.csv'),
  quantification: path.join(rootPath, 'Data', 'Quantification_of_inherent_flexibility.csv'),
  residentialHeatDemand: path.join(rootPath, 'Data', 'Residential_heat_demand_LSOA_Scotland.csv'),
  halfHourlyProfileHeating: path.join(rootPath, 'Data', 'Half-hourly_profiles_of_heating_technologies.csv'),
};

// Path to GeoJSON data for geographical shapes
const geojsonPath = path.join(rootPath, 'Data', 'lsoa.geojson')

// Define a directory path for cached files using the root path
const cacheDirPath = path.join(rootPath, 'cache');

// Define a directory path for local json files using the root path
const jsonFilePathDir = path.join(rootPath, 'processedData');

// Function to check if a cache file exists and is recent enough to serve
async function getCachedData(filePath) {
  try {
    const stats = await fs.stat(filePath); // Get file statistics
    const now = new Date();
    // If the cached file is recent enough, read and return its content
    if (now - stats.mtime < cacheTTL * 1000) {
      return await fs.readFile(filePath, 'utf8');
    }
    // If the file is too old, delete it
    await fs.unlink(filePath);
  } catch (error) {
    // If the file doesn't exist, ignore the error
    if (error.code !== 'ENOENT') { 
      throw error;
    }
  }
  // If no valid cache file is found, return null
  return null;
}

// Function to check if a local json file exists and is recent enough to serve
async function getLocalData(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    // If the file doesn't exist, ignore the error
    if (error.code !== 'ENOENT') { 
      throw error;
    }
  }
  // If no valid file is found, return null
  return null;
}

// Function to parse CSV data, cache it, and return the parsed data
async function parseAndCacheCSV(filePath) {
  const data = await fs.readFile(filePath, 'utf8'); // Read CSV file content
  const cacheFilePath = path.join(cacheDirPath, path.basename(filePath) + '.cache');
  
  // Parse the CSV data and resolve with the parsed data or reject with an error
  const results = await new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true, // Treat the first row as headers
      dynamicTyping: true, // Automatically convert strings to the correct type
      skipEmptyLines: true, // Skip empty lines in the CSV file
      complete: (results) => {
        resolve(results.data);
      }, // Resolve the promise with the data
      error: (error) => reject(error), // Reject the promise with an error
    });
  });

  // Write the parsed data to a new cache file
  await fs.writeFile(cacheFilePath, JSON.stringify(results), 'utf8');
  // Save the parsed data to a JSON file on the server
  const jsonDataFilePath = path.join(jsonFilePathDir, path.basename(filePath) + '.json');
  await fs.writeFile(jsonDataFilePath, JSON.stringify(results), 'utf8');
  return results;
}

// Function to handle requests for CSV data
async function handleCSVRequest(req, res, filePath) {
  const cacheFilePath = path.join(cacheDirPath, path.basename(filePath) + '.cache');
  const jsonDataFilePath = path.join(jsonFilePathDir, path.basename(filePath) + '.json');
  
  try {
    let cachedData = await getCachedData(cacheFilePath); // Attempt to get cached data
    let localData = await getLocalData(jsonDataFilePath); // Attempt to get local json data

    if (cachedData) {
      data = JSON.parse(cachedData); // Parse the data from the cache
      console.log("Using cache")
    } else if(localData) {
      data = JSON.parse(localData)
      console.log("Using local")
    } else {
      console.log("Parsing json")
      data = await parseAndCacheCSV(filePath); // Parse and cache data if data not stored as json on the server
    }

    res.type('application/json'); // Set response type to JSON
    res.json(data); // Send the data as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error handling CSV data request' }); // Handle any errors
  }
}

// Function to handle requests for GeoJSON data
async function handleGeoJSONRequest(req, res, filePath) {
  try {
    const geojsonData = await fs.readFile(filePath, 'utf8'); // Read GeoJSON file content
    res.type('application/json'); // Set response type to JSON
    res.send(geojsonData); // Send the GeoJSON data
  } catch (error) {
    console.error('Error serving GeoJSON data:', error);
    res.status(500).json({ error: 'Error serving GeoJSON data' }); // Handle any errors
  }
}

// Define API endpoints to get different types of CSV data

// API endpoint for annual heat data
router.get('/annualheat', (req, res) => {
  router.use(compression()); // Apply compression to the response data
  res.set('Cache-Control', `public, max-age=${cacheTTL}`); // Set cache control headers
  handleCSVRequest(req, res, csvPaths.annualHeat); // Handle the CSV request
});

// API endpoint for quantification data
router.get('/quantification', (req, res) => {
  res.set('Cache-Control', `public, max-age=${cacheTTL}`); // Set cache control headers
  handleCSVRequest(req, res, csvPaths.quantification); // Handle the CSV request
});

// API endpoint for residential heat demand data
router.get('/residentialheat', (req, res) => {
  res.set('Cache-Control', `public, max-age=${cacheTTL}`); // Set cache control headers
  handleCSVRequest(req, res, csvPaths.residentialHeatDemand); // Handle the CSV request
});

// API endpoint for geojson data
router.get('/geojson', (req, res) => {
  res.set('Cache-Control', `public, max-age=${cacheTTL}`); // Set cache control headers
  handleGeoJSONRequest(req, res, geojsonPath); // Handle the GeoJSON request
});

// API endpoint for half-hourly profile heating data
router.get('/halfhourlyheatingprofile', (req, res) => {
  res.set('Cache-Control', `public, max-age=${cacheTTL}`); // Set cache control headers
  handleCSVRequest(req, res, csvPaths.halfHourlyProfileHeating); // Handle the CSV request
});

//API ENDPOINT FOR SUMMARY OF HEAT DEMAND FOR ENGLAND,SCOTLAND,WALES
router.get('/summary', async (req, res) => {
  try {
    const data = await processHeatDemandData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Server error');
    console.log(error);
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
