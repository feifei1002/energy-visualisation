const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

//routes for client dashboard
const RegisterController = require("../../controllers/RegisterController");

//update register
router.post('/register', RegisterController.registerNewUser);

// Handle GET requests to /api/register
router.get('/register', (req, res) => {
    res.status(404).send('Not Found');
});
module.exports = router;

// const app = express();
// app.use(bodyParser.json());
//
// const port = process.env.PORT || 8082;
//
// app.get('/api/register', (req, res) => {
//     // Handle GET requests at /api/register
//     res.send('GET request to /api/register');
// });
//
// const axios = require('axios');
// const {registerNewUser} = require("../../controllers/RegisterController");
//
// app.use(bodyParser.json());
//
// // Admin route to approve a user
// app.put('/profile/approve', approveUser);
//
// app.listen(port, () => {
//     console.log('Server is running on port', port);
// });


