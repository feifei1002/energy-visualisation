import React from "react";
import { useState } from "react";
// import '../App.css'
import './Login.css'

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
        // below line is for testing the username and pass are correctly submitted
        // alert(event.target.elements.username.value + " and " + event.target.elements.password.value);
    }
    // end of code

    return (
        <>

        <form onSubmit={handleSubmit} class="loginForm">
            <div class="inputRow">
            <label>User Name</label>
            <input type="text" name="username" value={inputs.username} onChange={handleChange}/>
            </div>
            <div class="inputRow">
            <label>Password</label>
            <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
            </div>
            <div class="inputRow">
            <input type="submit" value="Login" />
            {/* https://stackoverflow.com/questions/2825856/html-button-to-not-submit-form  on 04/11*/}
            <button type="button" onClick="/">Register</button>
            {/* end */}
            </div>
        </form>
    
        </>
    );
}

export default Login;