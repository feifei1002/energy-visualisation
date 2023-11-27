const request = require('supertest');
const express = require('express');
const router = require('../routes/api/Admin'); 

const app = express();
app.use(express.json());
app.use('/api', router);

describe('GET /webadmin', () => {
    it('webadmin route should be unauthorized when accessing without token', async () => {
        const response = await request(app).get('/api/webadmin');
        // Expect to be unauthorized
        expect(response.status).toBe(401);
    });

    it('get all users route should be unauthorized when accessing without token', async () => {
        const response = await request(app).get('/api/getallusers');
        // Expect to be unauthorized
        expect(response.status).toBe(401);
    });

    it('getting all web admin details by username route should be unauthorized when accessing without token', async () => {
        const response = await request(app).get('/api/webadmin/user/:username');
        // Expect to be unauthorized
        expect(response.status).toBe(401);
    });

    it('reset password route should be unauthorized when accessing without token', async () => {
        const response = await request(app).post('/api/resetpassword');
        // Expect to be unauthorized
        expect(response.status).toBe(401);
    });

    it('webadmin route should be unauthorized with an invalid token', async () => {
        // Generate an invalid token 
        const invalidToken = 'invalid_token';
        const response = await request(app)
            .get('/api/webadmin')
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(401);
    });
});