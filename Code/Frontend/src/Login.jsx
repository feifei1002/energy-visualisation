import React from "react";
import { useState } from "react";
// import '../App.css'
import './Login.css'
import { useNavigate } from "react-router-dom";

function Login() {
    // https://www.w3schools.com/react/react_forms.asp on 04/11
    const [inputs, setInputs,] = useState("");

    const handleChange = (event) => {
        const username = event.target.username;
        const password = event.target.password;
        setInputs(values => ({...values, [username]: password}))
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        // below line is for testing the username and pass are correctly submitted
        // alert(event.target.elements.username.value + " and " + event.target.elements.password.value);

        // backend section
        
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

        <form onSubmit={handleSubmit} class="loginForm">
            <div class="inputRow">
            <label>User Name</label>
            {/* sets max length for username and password as 15 values, and both have to be a value */}
            <input type="text" name="username" value={inputs.username} onChange={handleChange} {...{ required: true, maxLength: 15 }} />
            </div>
            <div class="inputRow">
            <label>Password</label>
            <input type="password" name="password" value={inputs.password} onChange={handleChange} {...{ required: true, maxLength: 15 }} />
            </div>
            <div class="inputRow">
            <input type="submit" value="Login" />
            {/* https://stackoverflow.com/questions/2825856/html-button-to-not-submit-form  on 04/11*/}
            <button type="button" onClick={routeChange}>Register</button>
            {/* end */}
            </div>
        </form>
    
        </>
    );
}

export default Login;