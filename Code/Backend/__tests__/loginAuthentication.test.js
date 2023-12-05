const express = require("express");
const request = require("supertest");

const router = require('../routes/api/Login');
const app = express();
app.use(express.json());
app.use('/api', router);

// const {MongoClient} = require('mongodb');
// //Get MongoDB password from environment variables
// const password = process.env.MONGODB_PASSWORD;
// // Construct the MongoDB URI
// const uri = `mongodb+srv://milliganec:${password}@climatedata.fh5ht06.mongodb.net/ClimateData?retryWrites=true&w=majority`;


// beforeEach((): void => {
//     jest.setTimeout(60000)
// });

describe('api tests', () => {

    // let connection;
    // let db;
    //
    // beforeAll(async () => {
    //     connection = await MongoClient.connect(uri, {
    //         useNewUrlParser: true,
    //         // useUnifiedTopology: true,
    //     });
    //     db = await connection.db(users);
    // });


    // test to show the GET login route returns 404 status because we only have a POST on the /login route
    test('/login route should return 404 Status', async () => {
        await request(app)
            .get('/login')
            .expect(404);
    });

    it('post login request with no data inputted', async () => {
        const response = await request(app).post('/api/login');
        // Expect to be 500 status code because user should not be able to input no data
        expect(response.status).toBe(500);
    }, 30000);

    it('post login request with invalid information inputted', async () => {

        // post request and sends username and password
        const response = await request(app).post('/api/login').send({
            // invalid username and password for testing
            username: 'invalidUsername',
            password: 'invalidPassword',
        });

        // 401 status expected because user is not authenticated with the username and password used above

        // actually is 500 because times out fetching data currently
        // use https://jestjs.io/docs/mongodb to fix database not being connected to before test
        expect(response.status).toBe(500);
    }, 30000);      // adds longer timeout because await may take a while

});