import React from "react";
import { useState } from "react";
import '../css/Login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header.jsx";
import { WebAdminLogin } from "../loginFunctions/WebAdminLogin";

function Login() {

    // code to check username and password from login form using react hook
    // taken from Stack Overflow post by kodamace 19-03-2022
    // accessed 11-12-2023
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
    // end of referenced code

    // allow the password typed to be shown or hidden
    const [showPassword, setShowPassword] = useState(false);

    // function to change password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);

        //backend section
        try {
            const response = await axios.post('/api/login', inputs);
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('userID', response.data.user._id);
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
                   //Else block
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

        // Webadmin login
        try{
               // Attempt to post user data to the web admin login endpoint
               const webAdminResponse = await axios.post('/api/loginwebadmin', inputs);

               localStorage.setItem('accessToken', webAdminResponse.data.token);
               localStorage.setItem('role', webAdminResponse.data.role);
               localStorage.setItem('username', webAdminResponse.data.user);

               console.log("Username" + webAdminResponse.data.user)

               // Extract the username and token from the web admin response if successful
               const { user, token } = webAdminResponse.data;

               // Try login as a web admin using the WebAdminLogin logic
               const webAdminStatus = await WebAdminLogin(setStatus, navigate, webAdminResponse, token, user);

               // Continue login logic if WebAdminLogin failed
               if (webAdminStatus === 'error') {
                   console.log("Attempt login again");
                   setStatus({ type: 'error' });
               }
        } catch(e){
             // Handle other errors during the authentication process
             setStatus({ type: 'error' });
             console.error("Error with posting login details");
        }

    }

    // end of code

    // code to redirect the user to a new page when clicking a button
    // taken from Stack Overflow post by aravind_reddy 01-06-2018
    // accessed 11-12-2023
    // https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
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
                <div className="login-container" >
                    <form onSubmit={handleSubmit}>
                        <div className="inputRow">
                            <label>User Name</label>
                            {/* Set max length for username and password to 15 characters */}
                            <input type="text" name="username" data-testid="username-input" value={uname} onChange={handleChange} {...{ required: true, maxLength: 15 }} />
                        </div>
                        <div className="inputRow">
                            <label>Password</label>
                            <input type={showPassword ? 'text' : 'password'} name="password" data-testid="password-input" value={pass} onChange={handleChange} {...{ required: true }} />

                        </div>
                        {/* toggle visibility of password */}
                        <div className="inputRow">
                            <span onClick={togglePasswordVisibility}
                                  className="password-toggle">
                            {showPassword ? 'Hide Password' : 'Show Password'}
                            </span>
                        </div>
                        <div className="inputRow">
                            <input type="submit" value="Login" />

                            {/* code to have a button inside a form that does not submit the user inputs
                                taken from Stack Overflow post edited by jpp 05-02-2019
                                accessed 11-12-2023
                                https://stackoverflow.com/questions/2825856/html-button-to-not-submit-form */}
                            <button type="button" onClick={routeChange}>Register</button>
                            {/* end of code */}
                        </div>
                    </form>
                    {/* Display unique error messages from error handling */}
                    {status?.type === 'success' && <p>Successful Login!</p>}
                    {status?.type === 'error' && <p>Incorrect username or password, try again!</p>}

                    <div className="ForgotPasswordContainer">
                        <h4>Forgot password? contact webadmin@climatedata.com</h4>
                    </div>
                    <br/>
                </div>
            </main>

        </>
    );
}

export default Login;  // Export the Login component
