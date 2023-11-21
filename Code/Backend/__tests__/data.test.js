// Import the required modules
const express = require('express');
const request = require('supertest'); 

// Initialize an express application
const app = express();

// Import the router from the data routes
const router = require('../routes/data/Data'); 

// Use the imported router in the express application
app.use(router);

// Describe the test suite for API endpoints
describe('API endpoint tests', () => {
    // Test case for the /annualheat endpoint
    test('GET /annualheat should return CSV data', async () => {
      // Send a GET request to the /annualheat endpoint and store the response
      const response = await request(app).get('/annualheat');

      // Check if the response status code is 200
      expect(response.statusCode).toBe(200);

      // Check if the response type is 'application/json'
      expect(response.type).toBe('application/json');

      // Check if the response body contains an array of objects with specific properties
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "LSOA11CD": expect.any(String),
            "Area (km2)": expect.any(Number)
          }),
        ])
      );
    }, 20000); // Set a timeout of 10 seconds for this test case if needed
  
    // Test case for the /geojson endpoint
    test('GET /geojson should return GeoJSON data', async () => {
      // Send a GET request to the /geojson endpoint and store the response
      const response = await request(app).get('/geojson');

      // Check if the response status code is 200
      expect(response.statusCode).toBe(200);

      // Check if the response type is 'application/json'
      expect(response.type).toBe('application/json');

      // Check if the response body matches a specific structure
      expect(response.body).toMatchObject({
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:OGC:1.3:CRS84"
          }
        },
        features: expect.arrayContaining([
          expect.objectContaining({
            type: "Feature",
            properties: expect.any(Object),
            geometry: expect.any(Object)
          }),
        ])
      });
    }, 20000); // Set a timeout of 10 seconds for this test case if needed
});
