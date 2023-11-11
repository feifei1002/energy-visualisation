const User = require('../models/User');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

    // const usern = req.body.username;
    // const userp = req.body.password;

    // Filter user from the users array by username and password
    // const user = users.find(u => { return u.username === username && u.password === password });
    try {
        console.log("username inputted: " + data.username)
        const user = await User.findOne({username: data.username}).select('password'); //to exclude the password field
        console.log("password is " + user.password);
        if (data.password === user.password) {
            console.log("user and pass correct, ");
        } else {
            console.log("password incorrect, ")
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