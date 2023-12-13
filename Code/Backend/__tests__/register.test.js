// Import required libraries and modules
const request = require('supertest');
const express = require('express');
const router = require('../routes/api/Register');  // Assuming that the Register router is located at this path

// Create an Express application
const app = express();
app.use(express.json());  // Enable parsing of JSON requests
app.use('/api', router);  // Mount the Register router under the '/api' path

// Spy on console.log to track log statements in tests
jest.spyOn(console, 'log');

// Describe block for testing the 'GET /pending-users' route
describe('GET /pending-users', () => {
    // Test case: 'pending-users' route should be unauthorized when accessing without a token
    it('pending-users route should be unauthorized when accessing without a token', async () => {
        // Send a GET request to '/api/pending-users'
        const response = await request(app).get('/api/pending-users');
        // Expect the response status to be 401 (Unauthorized)
        expect(response.status).toBe(401);
    });

    // Test case: 'pending-users' route should be unauthorized with an invalid token
    it('pending-users route should be unauthorized with an invalid token', async () => {
        // Generate an invalid token
        const invalidToken = 'invalid_token';
        // Send a GET request to '/api/pending-users' with the invalid token in the Authorization header
        const response = await request(app)
            .get('/api/pending-users')
            .set('Authorization', `Bearer ${invalidToken}`);
        // Expect the response status to be 401 (Unauthorized)
        expect(response.status).toBe(401);
    });
});


