const User = require('../models/User');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const bcrypt = require("bcrypt");
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash

// post login data
const getLogin = async (request, response) => {
    try {
        //placeholder until alex merges how he will be handling logged in users
        //const userId = request.user._id;
        const user = await User.findOne({username: userName}).select('password'); //to exclude the password field
        // console log is to the server console
        console.log("password is "+user);
        // response.json(user);
    } catch (error) {
        console.error('Error fetching password:', error);
        response.status(500).json({ message: 'Error fetching password' });
    }
};

// used for testing for now, will change
const postLogin = async (req, res) => {
    // Read username and password from request body
    const data = req.body;

    try {
        // find the user in the table with the same username inputted
        // and selects the password
        const user = await User.findOne({username: data.username}).select('password');
        // compares the password inputted with the hashed password in the database, using bcrypt.compare
        const comparison = await bcrypt.compare(String(data.password), user.password);

        // comparison is true if both password match
        if (comparison === true) {
            // user is authenticated, after correctly logs in
            // for testing
            console.log("passwords match");

            // // generate auth token
            // const authToken = generateAuthToken();
            //
            // // Store authentication token
            // authTokens[authToken] = user;
            //
            // // Setting the auth token in cookies
            // res.cookie('AuthToken', authToken);
            //
            // // Redirect user to the protected page
            // res.redirect('/protected');
        } else {
            // for testing
            console.log("dont match");
        }


    } catch (error) {
            console.error('Error fetching password:', error);
        }

        // res.send(`username: ${usern}, password: ${userp}`);
    // if (user) {
    //     // Generate an access token
    //     const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
    //
    //     res.json({
    //         accessToken
    //     });
    // } else {
    //     res.send('Username or password incorrect');
    // }
};

module.exports = {
    getLogin,
    postLogin
};