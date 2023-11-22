const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/AdminUser');

router.get('/webadmin', async (req, res) => { 
    try {
        const webAdminUser = await AdminUser.find();
        res.json(webAdminUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching web admin user data.' });
    }
});

module.exports = router;