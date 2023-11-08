const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const bodyParser = require('body-parser');
const router = require("./Api"); // Add this line to parse the request body

app.use(bodyParser.json()); // Parse JSON request body

const port = process.env.PORT || 8082; // Use the desired port

const jwtCheck = auth({
    audience: 'http://localhost:8082/api/register', // Update audience
    issuerBaseURL: 'https://dev-osrswyxpukb5rlqq.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// Enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

// Define a POST route for user registration
app.post('/api/register', async (req, res) => {
    try {
        // Your user registration logic here
        // You can access the authenticated user's information through req.user

        // For example:
        const { fullName, username, password, email } = req.body;

        // Your registration logic here
        // You can interact with your 'User' model and save the user to your database

        // Send a success response
        res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed.' });
    }
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
// Admin route to approve a user
router.put('/profile/approve', approveUser);

module.exports = router;
