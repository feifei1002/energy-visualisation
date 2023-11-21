const express = require('express');
const router = express.Router();

const LoginController = require('../../controllers/LoginController');
const bodyParser = require("body-parser");

// post login
router.post('/login', bodyParser.json(), LoginController.postLogin);

module.exports = router;
