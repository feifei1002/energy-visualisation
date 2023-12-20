const express = require('express');
const app = express();
const router = express.Router();
const LoginController = require('../../controllers/LoginController');
const bodyParser = require("body-parser");

const {checkToken} = require("../../utils/tokenProcessor");

router.post('/login', LoginController.postLogin);
router.post('/logout', checkToken, (req, res) =>{

    res.json({message: "Logout successful"})
});

module.exports = router;
