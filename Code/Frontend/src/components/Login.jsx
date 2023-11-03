import React from "react";
import { useState } from "react";
import '../App.css'

function Login() {
    // https://www.w3schools.com/react/react_forms.asp
    const [inputs, setInputs,] = useState("");

    const handleChange = (event) => {
        const username = event.target.username;
        const password = event.target.password;
        setInputs(values => ({...values, [username]: password}))
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputs)
        alert(event.target.elements.username.value + " and " + event.target.elements.password.value);
        // alert("hello");
    }
    // end of code

    return (
        <>
        <h1>Login</h1>

    <form onSubmit={handleSubmit}>
      <label>User Name:
        <input type="text" name="username" value={inputs.username} onChange={handleChange}/>
      </label>
      <label>Password:
        <input type="text" name="password" value={inputs.password} onChange={handleChange}/>
      </label>
      <input type="submit" />
    </form>

        </>
    );
}

export default Login;