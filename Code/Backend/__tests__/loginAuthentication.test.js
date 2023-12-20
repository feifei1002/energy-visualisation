const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const router = require('../routes/api/Login');
const app = express();

// Get MongoDB password from environment variables
const password = process.env.MONGODB_PASSWORD;
// Construct the MongoDB URI
const uri = `mongodb+srv://milliganec:${password}@climatedata.fh5ht06.mongodb.net/ClimateData?retryWrites=true&w=majority`;

app.use(express.json());
app.use('/api', router);

jest.spyOn(console, 'log');


// backend tests for the login authentication
describe('post and get request tests for the login authentication', () => {
    // before each test connects to the database
    beforeEach(async () => {
        await mongoose.connect(uri);
    });

    // closes database connection after each test
    afterEach(async () => {
        await mongoose.connection.close();
    });


    // test to show the GET login route returns 404 status because we only have a POST on the /login route
    test('/login route should return 404 Status', async () => {
        await request(app)
            // get request
            .get('/login')
            .expect(404);
    });

    // post request when no data is sent
    it('post login request with no data inputted', async () => {
        // post request with express
        const response = await request(app).post('/api/login');

        // status code is expected to be 401 because user isn't authenticated when no input data
        expect(response.status).toBe(401);
    });


    // post request with invalid data
    it('post login request with invalid information inputted', async () => {

        // post request
        const response = await request(app).post('/api/login').send({
            // invalid username and password sent with request
            username: 'invalidUsername',
            password: 'invalidPassword',
        });

        // 401 status expected because user is not authenticated with the username and password used above
        expect(response.status).toBe(401);
    });
});

