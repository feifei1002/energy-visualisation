const express = require("express");
const request = require("supertest");

const router = require('../routes/api/Login');
const app = express();
app.use(express.json());
app.use('/api', router);

// beforeEach((): void => {
//     jest.setTimeout(60000)
// });

describe('api tests', () => {
    // test to show the GET login route returns 404 status because we only have a POST on the /login route
    test('/login route should return 404 Status', async () => {
        await request(app)
            .get('/login')
            .expect(404);
    });

    it('post login request with no data inputted', async () => {
        const response = await request(app).post('/api/login');
        // Expect to be unauthorized
        expect(response.status).toBe(401);
    }, 30000);

    it('post login request with invalid information inputted', async () => {

        // post request and sends username and password
        const response = await request(app).post('/api/login').send({
            // invalid username and password for testing
            username: 'invalidUsername',
            password: 'invalidPassword',
        });

        // 401 status expected because user is not authenticated with the username and password used above
        expect(response.status).toBe(401);
    }, 30000);      // adds longer timeout because await may take a while

});