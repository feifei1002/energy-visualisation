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
    const [status, setStatus] = useState(undefined);

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
            localStorage.setItem('accessToken', response.data.token);
            console.log(response)
            setInputs(response.data)
            const {user,  token} = response.data;
            console.log('Received user:', user._id, 'Recieved token: ', token);


            // If an auth token was sent back
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    // The response was a JSON object (with an access token)
                    setStatus({ type: 'success' });

                // data has access token
                navigate('/profiledashboard', { state: { token, userID: user._id } });

            } else {
                // The response wasn't a JSON object

                    // Try login as a web admin using the WebAdminLogin logic
                    const webAdminStatus = await WebAdminLogin(setStatus, navigate, webAdminResponse, token, user);

                    // Continue login logic if WebAdminLogin failed
                    if (webAdminStatus === 'error') {
                        console.log("Attempt login again");
                        setStatus({ type: 'error' });
                    }
                }
            } catch (e) {
                // Handle errors related to getting the response header
                setStatus({ type: 'error' });
                console.log("Cannot get the header for the form response");
            }
        } catch (error) {
            // Handle other errors during the authentication process
            setStatus({ type: 'error' });
            console.error("Error with posting login details");
        }
    }
    // end of code

    // from https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page 06/11
    // Navigate function from react-router-dom
    let navigate = useNavigate();

    // Function to change route to the registration page
    const routeChange = () => {
        let path = '/register';
        navigate(path);
    }
    // end of code

    return (
        <>
            <Header />  {/* Display the header component */}

            <main>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <div className="inputRow">
                            <label>User Name</label>
                            {/* Set max length for username and password to 15 characters */}
                            <input type="text" name="username" value={uname} onChange={handleChange} {...{ required: true, maxLength: 15 }} />
                        </div>
                        <div className="inputRow">
                            <label>Password</label>
                            <input type="password" name="password" value={pass} onChange={handleChange} {...{ required: true }} />
                        </div>
                        <div className="inputRow">
                            <input type="submit" value="Login" />
                             {/* https://stackoverflow.com/questions/2825856/html-button-to-not-submit-form  on 04/11*/}
                            <button type="button" onClick={routeChange}>Register</button>
                            {/* Display unique error messages from error handling */}
                            {status?.type === 'success' && <p>Successful Login!</p>}
                            {status?.type === 'error' && <p>Incorrect username or password, try again!</p>}
                            <div className="ForgotPasswordContainer">
                             <h4>Forgot password? contact webadmin@climatedata.com</h4>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

        </>
    );
}

export default Login;  // Export the Login component
