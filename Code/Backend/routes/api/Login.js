const express = require('express');
const app = express();
const router = express.Router();

const LoginController = require('../../controllers/LoginController');
const bodyParser = require("body-parser");
router.put('/login', LoginController.getLogin);

router.put('/login1', bodyParser.json(), LoginController.postLogin);

module.exports = router;
