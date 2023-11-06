// data.test.js
const express = require('express');
const request = require('supertest'); 
const app = express();
const router = require('../routes/data/Data'); 

// Apply the router to the express app
app.use(router);

describe('API endpoint tests', () => {
    //Test for the /annualheat endpoint
    test('GET /annualheat should return CSV data', async () => {
      const response = await request(app).get('/annualheat');
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "LSOA11CD": expect.any(String),
            "Area (km2)": expect.any(Number)
          }),
        ])
      );
    }, 10000); // Timeout set to 10 seconds if needed
  
    //Test for the /geojson endpoint
    test('GET /geojson should return GeoJSON data', async () => {
      const response = await request(app).get('/geojson');
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
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
    }, 10000); // Timeout set to 10 seconds if needed
});