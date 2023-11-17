import React from 'react';
import { postLogin } from '../controllers/LoginController'
import axios from 'axios';
import * as jest from "node/test";
import mockAxios from "express";
import { fetchData } from '../request';

jest.mock('axios');


describe("Login Authentication", () => {
    // tests here
    // test("submitting correct username and password", () => {
    //     const inputs = [
    //         {username: "aliceadmin", password: "alice@123"}
    //     ];
    //     // const response = {accessToken};
    //
    //     // axios.get.mockResolvedValue(response);
    // })

    it('Submitting an invalid password', async () => {
        const inputs = [
            {username: "aliceadmin", password: "PasswordToFail"}
        ];

        const data = ['testtoken'];

        const response: AxiosResponse<any> = {
            data,
            headers: {},
            config: { url: 'http://localhost:5173/login' },
            status: 200,
            statusText: 'OK',
        };




        // postLogin(inputs, {}).then(response => {
        //     expect(response).toEqual({
        //         data: {},
        //     });
        // });
        // expect(mockAxios.request).toHaveBeenCalledWith({
        //     method: 'post',
        //     url: '/login'
        // });
        // expect(mockAxios.request).toHaveBeenCalledTimes(1);
        // done();
    });
});