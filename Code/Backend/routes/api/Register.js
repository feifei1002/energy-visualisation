const express = require('express');
const router = express.Router();
const PendingUser = require('../../models/PendingUser');

router.get('/api/register', (req, res) => {
    res.send('Server is running. /api/register endpoint is accessible.');
});

router.post('/api/register', async (req, res) => {
    try {
        // Await the promise returned by registerNewUser
        await RegisterController.registerNewUser(req, res);
        res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
    } catch (error) {
        console.error('Error handling registration:', error);
        return res.status(500).json({ message: 'Registration failed.' });
    }
});

router.get('/api/pending-users', async (req, res) => {
    try {
        console.log("HEY MADE IT HERE");
        const pendingUsers = await PendingUser.find({ approved: false });
        res.json(pendingUsers);

    }
    catch (e) {
        console.error(e);
    }
});

router.post('/api/approve-user/:userId', async (req, res) => {
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
router.post('/deny-user/:userId', async (req, res) => {
    const { userId } = req.params;
    const { approved } = req.body;

    try {
        // Update the approval status in the PendingUser schema
        await PendingUser.findByIdAndUpdate(userId, { approved });

        res.json({ message: 'User denial status updated.' });
    } catch (error) {
        console.error('Error denying user:', error);
        res.status(500).json({ message: 'Error denying user. Please try again.' });
    }
});

// router.delete('/delete-user/:userId', async (req, res) => {
//     const { userId } = req.params;
//
//     try {
//         // Remove the pending user from the PendingUser schema
//         await PendingUser.findByIdAndRemove(userId);
//
//         res.json({ message: 'User deleted from pending users.' });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ message: 'Error deleting user. Please try again.' });
//     }
// });



// router.get('/api/register', (req, res) => {
//     res.send('Server is running. /api/register endpoint is accessible.');
// });
//
// router.post('/api/register', async (req, res) => {
//     try {
//         // Await the promise returned by registerNewUser
//         await RegisterController.registerNewUser(req, res);
//         res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
//     } catch (error) {
//         console.error('Error handling registration:', error);
//         return res.status(500).json({ message: 'Registration failed.' });
//     }
// });
//
// router.get('/api/pending-users', async (req, res) => {
//     const pendingUsers = await PendingUser.find({ approved: false });
//     res.json(pendingUsers);
// });
//
// router.post('/api/approve-user/:userId', async (req, res) => {
//     const { userId } = req.params;
//     const { approved } = req.body;
//
//     try {
//         // Update the approval status in the PendingUser schema
//         await PendingUser.findByIdAndUpdate(userId, { approved });
//
//         // If approved, move the user to the User schema
//         if (approved) {
//             const pendingUser = await PendingUser.findById(userId);
//
//             if (pendingUser) {
//                 // Create a new User based on the pending user's details
//                 const newUser = new User({
//                     fullName: pendingUser.fullName,
//                     username: pendingUser.username,
//                     email: pendingUser.email,
//                     password: pendingUser.password,
//                 });
//
//                 // Save the new User
//                 await newUser.save();
//
//                 // Remove the pending user from the PendingUser schema
//                 await PendingUser.findByIdAndRemove(userId);
//             }
//         }
//
//         res.json({ message: 'User approval status updated.' });
//     } catch (error) {
//         console.error('Error approving user:', error);
//         res.status(500).json({ message: 'Error approving user. Please try again.' });
//     }
// });
//
// module.exports = router;

//An API router file to store the backend API routes
// const express = require('express');
// const RegisterController = require("../../controllers/RegisterController");
// const PendingUser = require("../../models/PendingUser");
// const User = require("../../models/User");
// const router = express.Router();
// const app = express();

// app.get('/api/register', (req, res) => {
//     res.send('Server is running. /api/register endpoint is accessible.');
// });
//
// app.post('/api/register', async (req, res) => {
//     try {
//         // Await the promise returned by registerNewUser
//         await RegisterController.registerNewUser(req, res);
//         res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
//     } catch (error) {
//         console.error('Error handling registration:', error);
//         return res.status(500).json({ message: 'Registration failed.' });
//     }
// });
// app.get('/api/pending-users', async (req, res) => {
//     const pendingUsers = await PendingUser.find({ approved: false });
//     res.json(pendingUsers);
// });
//
// app.post('/api/approve-user/:userId', async (req, res) => {
//     const { userId } = req.params;
//     const { approved } = req.body;
//
//     try {
//         // Update the approval status in the PendingUser schema
//         await PendingUser.findByIdAndUpdate(userId, { approved });
//
//         // If approved, move the user to the User schema
//         if (approved) {
//             const pendingUser = await PendingUser.findById(userId);
//
//             if (pendingUser) {
//                 // Create a new User based on the pending user's details
//                 const newUser = new User({
//                     fullName: pendingUser.fullName,
//                     username: pendingUser.username,
//                     email: pendingUser.email,
//                     password: pendingUser.password,
//                 });
//
//                 // Save the new User
//                 await newUser.save();
//
//                 // Remove the pending user from the PendingUser schema
//                 await PendingUser.findByIdAndRemove(userId);
//             }
//         }
//
//         res.json({ message: 'User approval status updated.' });
//     } catch (error) {
//         console.error('Error approving user:', error);
//         res.status(500).json({ message: 'Error approving user. Please try again.' });
//     }
// });



module.exports = router;