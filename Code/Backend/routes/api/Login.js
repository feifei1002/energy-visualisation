const express = require('express');
const router = express.Router();

const LoginController = require('../../controllers/LoginController');
router.put('/login', LoginController.getLogin);

module.exports = router;