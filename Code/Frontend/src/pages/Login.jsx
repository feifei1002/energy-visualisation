import React from "react";
import { useState } from "react";
// import '../App.css'
import '../css/Login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header.jsx";
import {useAuth0} from "@auth0/auth0-react";

function Login() {

    // https://stackoverflow.com/questions/71536244/check-username-password-login-form-using-react-hooks
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const {uname, pass} = inputs;

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]:[e.target.value]})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);

        // backend section
        try {
            const response = await axios.post('/api/login', inputs);
            console.log(response)
            setInputs(response.data)

            // if auth token sent
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                // The response was a JSON object (with an access token)

                // data has access token
                navigate('/profiledashboard');

            } else {
                // The response wasn't a JSON object

                // data inputted was not authenticated
                console.log("attempt login again");

            }


        } catch (error) {
            console.error('Error with login:', error);
        }
    }
    // end of code

    // from https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page 06/11
    let navigate = useNavigate();
    const routeChange = ()  => {
        let path = '/register';
        navigate(path);
    }
    // end of code

    return (
        <>
            <Header />

            <main>
                <div className="login">
                <form onSubmit={handleSubmit}>
                    <div className="inputRow">
                    <label>User Name</label>
                    {/* sets max length for username and password as 15 values, and both have to be a value */}
                    <input type="text" name="username" value={uname} onChange={handleChange} {...{ required: true, maxLength: 15 }} />
                    </div>
                    <div className="inputRow">
                    <label>Password</label>
                    <input type="password" name="password" value={pass} onChange={handleChange} {...{ required: true, maxLength: 15 }} />
                    </div>
                    <div className="inputRow">
                    <input type="submit" value="Login" />
                    {/*    <button onClick={() => loginWithRedirect()} value="Login"></button>*/}
                    {/* https://stackoverflow.com/questions/2825856/html-button-to-not-submit-form  on 04/11*/}
                    <button type="button" onClick={routeChange}>Register</button>
                    {/* end */}
                    </div>
                </form>
                </div>
            </main>

        </>
    );
}

export default Login;