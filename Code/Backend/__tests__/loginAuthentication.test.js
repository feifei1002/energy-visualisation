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
    // test('post /login', async () => {
    //     const inputs = [
    //         {username: "admin", password: "PasswordToFail"}
    //     ];
    //
    //     // const response = await axios.post('/api/login', inputs);
    //     // expect(response.data).toBeDefined();
    //     // axios.post.mockResolvedValueOnce(inputs);
    //     // let axiosPromise = axios.post('/login/', { data: inputs });
    //     // expect(axios.post).toHaveBeenCalledWith(`/login`);
    //
    //     const res = { data: inputs };
    //     axios.post.mockResolvedValueOnce(res);
    //     // await postLogin();
    //     await expect(postLogin()).resolves.toEqual(inputs);
    // });

    // test to show the GET login route returns 404 status because we only have a POST on the /login route
    test('/login route should return 404 Status', async () => {
        await request(app)
            .get('/login')
            .expect(404);
    });

    // test('should send some stuff', async () => {
    //     const request = httpMocks.createRequest({
    //         method: 'POST',
    //         url: '/login'
    //     });
    //
    //     const response = httpMocks.createResponse();
    //
    //     // await postLogin(request, response);
    //
    //     // const { property } = JSON.parse(response._getHeaders("content-type"));
    //
    //     // await expect(postLogin()).resolves.toEqual(200);
    // });

    // test('y', () => {
    //     fetch("localhost:5173/login", {
    //         method: "POST",
    //         body:JSON.stringify({
    //             username: "username",
    //             password: "password"
    //         })
    //     }).then(
    //         response => response.json()
    //     ).then(response => {
    //         expect(Array.isArray(response)).toBe(true);
    //     })
    //
    // })

});