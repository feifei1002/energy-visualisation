// Import required libraries
const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const Papa = require('papaparse');
const fs = require('fs').promises; // Correct way to require fs.promises
const compression = require('compression');

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

const cacheDirPath = path.join(rootPath, 'cache'); // Define a directory for cached files

// Function to check if a cache file exists and is recent enough
async function getCachedData(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const now = new Date();
    if (now - stats.mtime < cacheTTL * 1000) {
      // The file is recent enough, read and return its content
      return await fs.readFile(filePath, 'utf8');
    }
    // If the file is too old, remove it
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') { // Ignore error if the file does not exist
      throw error;
    }
  }
  return null; // No valid cache file found
}

// Function to parse and cache CSV data
async function parseAndCacheCSV(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  const cacheFilePath = path.join(cacheDirPath, path.basename(filePath) + '.cache');
  
  const results = await new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });

  // Write the parsed data to a cache file
  await fs.writeFile(cacheFilePath, JSON.stringify(results), 'utf8');
  return results;
}

// Function to handle CSV data requests
async function handleCSVRequest(req, res, filePath) {
  const cacheFilePath = path.join(cacheDirPath, path.basename(filePath) + '.cache');
  
  try {
    // Try to get data from cache file
    let data = await getCachedData(cacheFilePath);
    
    if (data) {
      // Parse the data from cache and send it as a response
      data = JSON.parse(data);
    } else {
      // Data was not cached, parse from CSV and cache it
      data = await parseAndCacheCSV(filePath);
    }
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error handling CSV data request' });
  }
}

async function handleGeoJSONRequest(req, res, filePath) {
  try {
    const geojsonData = await fs.readFile(filePath, 'utf8');
    res.type('application/json');
    res.send(geojsonData);
  } catch (error) {
    console.error('Error serving GeoJSON data:', error);
    res.status(500).json({ error: 'Error serving GeoJSON data' });
}
}

// Define API endpoints to get different types of CSV data

// API endpoint for annual heat data
router.get('/annualheat', (req, res) => {
  router.use(compression());
  res.set('Cache-Control', `public, max-age=${cacheTTL}`);
  handleCSVRequest(req, res, csvPaths.annualHeat); // Corrected to pass the file path
});

// API endpoint for quantification data
router.get('/quantification', (req, res) => {
  res.set('Cache-Control', `public, max-age=${cacheTTL}`);
  handleCSVRequest(req, res, 'quantificationData', quantificationCache, csvPaths.quantification);
});

// API endpoint for residential heat demand data
router.get('/residentialheat', (req, res) => {
  res.set('Cache-Control', `public, max-age=${cacheTTL}`);
  handleCSVRequest(req, res, 'residentialHeatDemandData', residentialHeatDemandCache, csvPaths.residentialHeatDemand);
});

// API endpoint for geojson data
router.get('/geojson', (req, res) => {
  res.set('Cache-Control', `public, max-age=${cacheTTL}`);
  handleGeoJSONRequest(req, res, geojsonPath);
});


// Export the router
module.exports = router;