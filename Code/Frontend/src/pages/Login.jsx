import React from "react";
import { useState } from "react";
import '../css/Login.css';  // Import CSS for the Login component
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header.jsx";
import { WebAdminLogin } from "../loginFunctions/WebAdminLogin";

// Frontend login page to allow users to input their username and password for authentication in the backend
function Login() {

    // https://stackoverflow.com/questions/71536244/check-username-password-login-form-using-react-hooks
    // State to manage input values and status messages
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [status, setStatus] = useState(undefined);

    const { uname, pass } = inputs;

    // Handle input changes
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: [e.target.value] });
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent default form submission behavior
        console.log(event);

        // Backend section
        try {
            // Attempt to post user data to the login endpoint
            const response = await axios.post('/api/login', inputs);

            // If an auth token was sent back
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    // The response was a JSON object (with an access token)
                    setStatus({ type: 'success' });

                    // Add authentication for normal user login here, look at web admin login authentication

                    // Navigate the user to the profile dashboard
                    navigate('/profiledashboard');
                } else {
                    // Attempt to post user data to the web admin login endpoint
                    const webAdminResponse = await axios.post('/api/loginwebadmin', inputs);

                    // Extract the username and token from the web admin response if successful
                    const { user, token } = webAdminResponse.data;

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

    // from https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page 06/11
    // Navigate function from react-router-dom
    let navigate = useNavigate();

    // Function to change route to the registration page
    const routeChange = () => {
        let path = '/register';
        navigate(path);
    }

    // Render the Login component
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
                        </div>
                        <div className="ForgotPasswordContainer">
                            <h4>Forgot password? contact webadmin@climatedata.com</h4>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;  // Export the Login component
