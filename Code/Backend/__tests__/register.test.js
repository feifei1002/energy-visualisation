const request = require('supertest');
const express = require('express');
const router = require('../routes/api/Register');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('GET /pending-users', () => {
    it('pending-users route should be unauthorized when accessing without token', async () => {
        const response = await request(app).get('/api/pending-users');
        // Expect to be unauthorized
        expect(response.status).toBe(401);
    });
    it('pending-users route should be unauthorized with an invalid token', async () => {
        // Generate an invalid token
        const invalidToken = 'invalid_token';
        const response = await request(app)
            .get('/api/pending-users')
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(401);
    });
});

// it('get all users route should be unauthorized when accessing without token', async () => {
//     const response = await request(app).get('approve-user/:userId');
//     // Expect to be unauthorized
//     expect(response.status).toBe(401);
// });
//
// it('getting all web admin details by username route should be unauthorized when accessing without token', async () => {
//     const response = await request(app).get('/deny-user/:userId');
//     // Expect to be unauthorized
//     expect(response.status).toBe(401);
// });