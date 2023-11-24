const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/AdminUser');
const User = require('../../models/User');
const WebAdminController = require('../../controllers/WebAdminController');
const bodyParser = require("body-parser");

// Fetch all web admin user details, reminder this needs to be protected using JWT token IMPORTANT!
router.get('/webadmin', async (req, res) => { 
    try {
        const webAdminUser = await AdminUser.find();
        res.json(webAdminUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

// Fetch the specific webAdmin user, ditto
router.get('/webadmin/:id', async (req, res) => {
    let webAdminUserId;

    if (req.params.id === '1') {
        webAdminUserId = '655e6a05e0757371ad10394d';
    } else {
        webAdminUserId = req.params.id;
    }

    try {
        const webAdminUser = await AdminUser.findById(webAdminUserId);

        if (!webAdminUser) {
            return res.status(404).json({ message: 'Web Admin user not found.' });
        }

        res.json(webAdminUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

//Get web admin by username, ditto
router.get('/webadmin/user/:username', async (req, res) => {
    try {
        const webAdminUser = await AdminUser.findOne({ username: req.params.username });

        console.log(webAdminUser)

        if (!webAdminUser) {
            return res.status(404).json({ message: 'Web Admin user not found.' });
        }

        res.json(webAdminUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

// Fetch all user details, reminder this needs to be protected using JWT token IMPORTANT!
router.get('/getallusers', async (req, res) => { 
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

router.get('webadmin')

router.post('/loginwebadmin', WebAdminController.postWebAdminLogin);

module.exports = router;