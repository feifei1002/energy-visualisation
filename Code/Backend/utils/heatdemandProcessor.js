const path = require('path');
const fs = require('fs').promises;

//defining paths for json data and cache directories
const annualHeatDemandPath = path.join(__dirname, '../../processedData/Annual_heat_demand_LSOA_EnglandWales.csv.json');
const residentialHeatDemandPath = path.join(__dirname, '../../processedData/Residential_heat_demand_LSOA_Scotland.csv.json');
const cacheDirPath = path.join(__dirname, '../../cache');
const cacheFilePath = path.join(cacheDirPath, 'aggregatedHeatDemandData.cache');

//defining the time-to-live (TTL) for caching in seconds (one day)
const cacheTTL = 24 * 60 * 60;
async function processHeatDemandData() {
    try {
        //check if the cached data exists, if so return it
        const cachedData = await getCachedData(cacheFilePath);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        //read then process the json files
        const annualHeatData = JSON.parse(await fs.readFile(annualHeatDemandPath, 'utf8'));
        const residentialHeatData = JSON.parse(await fs.readFile(residentialHeatDemandPath, 'utf8'));
        const aggregatedData = aggregateData(annualHeatData, residentialHeatData);

        //cache the processed data for future calls
        await fs.writeFile(cacheFilePath, JSON.stringify(aggregatedData), 'utf8');
        return aggregatedData;
    } catch (error) {
        console.error('Error processing heat demand data:', error);
        throw error;
    }
}
function determineRegionFromLSOA(LSOA11CD) {
    //this is a simplification, but it works for the current application of seperating by region
    if (LSOA11CD.startsWith('E')) {
        return 'England';
    } else if (LSOA11CD.startsWith('W')) {
        return 'Wales';
    } else {
        return 'Scotland';
    }
}

function aggregateData(annualHeatData, residentialHeatData) {
    //aggregate and process the data
    const aggregatedData = {
        England: { totalBefore: 0, totalAfter: 0, area: 0, averagePerSqKmBefore: 0, averagePerSqKmAfter: 0 },
        Wales: { totalBefore: 0, totalAfter: 0, area: 0, averagePerSqKmBefore: 0, averagePerSqKmAfter: 0 },
        Scotland: { totalBefore: 0, totalAfter: 0, area: 0, averagePerSqKmBefore: 0, averagePerSqKmAfter: 0 }
    };

    //process the annual heat data for england and wales
    annualHeatData.forEach(item => {
        const region = determineRegionFromLSOA(item.LSOA11CD); // Implement this function based on LSOA codes
        aggregatedData[region].totalBefore += item['Total heat demand before energy efficiency measures 2018 (kWh)'];
        aggregatedData[region].totalAfter += item['Total heat demand after energy efficiency measures 2018 (kWh)'];
        aggregatedData[region].area += item['Area (km2)'];
    });

    //process the heat data for scotland
    residentialHeatData.forEach(item => {
        aggregatedData['Scotland'].totalBefore += item['Total heat demand before energy efficiency measures 2018 (kWh)'];
        aggregatedData['Scotland'].totalAfter += item['Total heat demand after energy efficiency measures 2018 (kWh)'];
        aggregatedData['Scotland'].area += item['Area (km2)'];
    });

    //calculate averages
    for (const region in aggregatedData) {
        aggregatedData[region].averagePerSqKmAfter = aggregatedData[region].totalAfter / aggregatedData[region].area;
        aggregatedData[region].averagePerSqKmBefore = aggregatedData[region].totalBefore / aggregatedData[region].area;
    }

    return aggregateDataTransform(aggregatedData);
}

function aggregateDataTransform(aggregatedData) {
    //transform the newly aggregated data into array with an actual region key
    return Object.keys(aggregatedData).map(region => ({
        region: region,
        totalBefore: aggregatedData[region].totalBefore,
        totalAfter: aggregatedData[region].totalAfter,
        area: aggregatedData[region].area,
        averagePerSqKmBefore: aggregatedData[region].averagePerSqKmBefore,
        averagePerSqKmAfter: aggregatedData[region].averagePerSqKmAfter
    }));
}


async function getCachedData(filePath) {
    try {
        const stats = await fs.stat(filePath);
        const now = new Date();
        // Check if the cache file is recent enough to use
        if (now - stats.mtime < cacheTTL) {
            return await fs.readFile(filePath, 'utf8');
        }
        // If the cache is too old, delete it
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;  // Ignore file-not-found error
    }
    return null;
}

//export the function used in heatDemand.js
module.exports = { processHeatDemandData };
