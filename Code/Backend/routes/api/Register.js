const express = require('express');
const router = express.Router();
const PendingUser = require('../../models/PendingUser');
const RegisterController = require('../../controllers/RegisterController');
const User = require("../../models/User");

const {checkToken} = require("../../utils/tokenProcessor");

router.get('/register', (req, res) => {
    res.send('Server is running. /api/register endpoint is accessible.');
});

router.post('/register', RegisterController.registerNewUser);

router.get('/pending-users', checkToken, async (req, res) => {
    try {
        const pendingUsers = await PendingUser.find({ approved: false });
        res.json(pendingUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching pending user data.' });
    }
});

router.post('/approve-user/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;
    const { approved } = req.body;

    try {
        // Update the approval status in the PendingUser schema
        await PendingUser.findByIdAndUpdate(userId, { approved });

        // If approved, move the user to the User schema
        if (approved) {
            const pendingUser = await PendingUser.findById(userId);

            if (pendingUser) {
                // Create a new User based on the pending user's details
                const newUser = new User({
                    fullName: pendingUser.fullName,
                    username: pendingUser.username,
                    email: pendingUser.email,
                    password: pendingUser.password,
                });

                // Save the new User
                await newUser.save();

                // Remove the pending user from the PendingUser schema
                await PendingUser.findByIdAndRemove(userId);
            }
        }

        res.json({ message: 'User approval status updated.' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Error approving user. Please try again.' });
    }
});
router.post('/deny-user/:userId', checkToken, async (req, res) => {
    const { userId } = req.params;
    const { approved } = req.body;

    try {
        // Update the approval status in the PendingUser schema
        await PendingUser.findByIdAndRemove(userId);

        res.json({ message: 'User denial status updated.' });
    } catch (error) {
        console.error('Error denying user:', error);
        res.status(500).json({ message: 'Error denying user. Please try again.' });
    }
});

module.exports = router;