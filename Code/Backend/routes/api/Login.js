const express = require('express');
const app = express();
const router = express.Router();
const { expressjwt } = require("express-jwt");
const jwt = require('jsonwebtoken');
const LoginController = require('../../controllers/LoginController');
const bodyParser = require("body-parser");
const key = process.env.ACCESS_TOKEN;
// router.put('/login', LoginController.getLogin);;

router.post('/login', LoginController.postLogin);
router.post('/logout', bodyParser.json, LoginController.logout);

module.exports = router;
