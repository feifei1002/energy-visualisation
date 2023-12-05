const express = require("express");
const request = require("supertest");
const app = express();

const router = require('../routes/api/Login');
const { postLogin } = require('../controllers/LoginController');
app.use(router);
const httpMocks = require('node-mocks-http');

const axios = require("axios");
const {response} = require("express");
jest.mock("axios");

describe('api tests', () => {
    // test to show the GET login route returns 404 status because we only have a POST on the /login route
    test('/login route should return 404 Status', async () => {
        await request(app)
            .get('/login')
            .expect(404);
    });

});