const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/api/Profile');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

jest.mock('../models/User');

describe('User Profile Routes', () => {
    it('GET /profile/:userID should be unauthorized without token', async () => {
        const response = await request(app).get('/api/profile/6547a45b34f0a29c8b36978f');
        expect(response.status).toBe(401);
    });

    it('GET /profile/:userID should be unauthorized with an invalid token', async () => {
        const invalidToken = 'invalid_token';
        const response = await request(app)
            .get('/api/profile/6547a45b34f0a29c8b36978f')
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(401);
    });

});
