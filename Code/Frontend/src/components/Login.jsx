import React from "react";
import { useState } from "react";
// import '../App.css'
import './Login.css'

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

    <form onSubmit={handleSubmit}>
      <div class="inputRow">
      <label>User Name: </label>
      <input type="text" name="username" value={inputs.username} onChange={handleChange}/>
      </div>
      <div class="inputRow">
      <label>Password: </label>
      <input type="password" name="password" value={inputs.password} onChange={handleChange}/>
      </div>
      <div class="inputRow">
      <input type="submit" value="Login" />
      {/* https://stackoverflow.com/questions/2825856/html-button-to-not-submit-form */}
      <button type="button" onClick="/">New? Register</button>
      {/* end */}
      </div>
    </form>
    

        </>
    );
}

export default Login;