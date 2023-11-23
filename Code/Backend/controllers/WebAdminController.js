const AdminUser = require('../models/AdminUser');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const getWebAdminDetails = async (req, res) => {
    try {
      let webAdminId;
  
      if (req.params.id === '1') {
          webAdminId = '655e6a05e0757371ad10394d';
      } else {
          webAdminId = req.params.id;
      }
  
      const webAdmin = await AdminUser.findById(webAdminId);
  
      if (!webAdmin) {
          return res.status(404).json({ message: 'Web Admin user not found.' });
      }
  
      res.status(200).json(webAdmin);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const postWebAdminLogin = async (req, res) => {
    const data = req.body;
    console.log(data)

    try {
        const webAdmin = await AdminUser.findOne({ username: data.username });

        console.log("Web Admin Is: " + webAdmin)

        if (!webAdmin) {
            console.error('Username does not match any in the system');
            return res.status(401).send('Username is incorrect');
        }

        const comparison = await bcrypt.compare(String(data.password), webAdmin.password);

        if (comparison) {
            const accessToken = jwt.sign({ username: data.username }, process.env.ACCESS_TOKEN, { expiresIn: '30m' });
            res.json({ accessToken });
        } else {
            console.error('Password is incorrect');
            res.status(401).send('Password is incorrect');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { getWebAdminDetails, postWebAdminLogin };