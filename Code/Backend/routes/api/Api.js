//An API router file to store the backend API routes
const express = require('express');
const router = express.Router();
const app = express();
const verifyToken = require('../api/Profile')
// Load Test and user model
const Test = require('../../models/Test');

// @route GET api/test
// @description test route
// @access Public
router.get('/', (req, res) => res.send('route testing!'));

// // attempting login auth
// const passport = require("passport");
// const User = require('../../models/User')

// // Passport middleware
// app.use(passport.initialize());// Passport config
// // require("./config/passport")(passport);// Routes


// // https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
// router.post("/login", (req, res) => {
//     // Form validationconst { errors, isValid } = validateLoginInput(req.body);// Check validation
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     const username = req.body.username;
//     const password = req.body.password;// Find user by email
//     User.findOne({ username }).then(user => {
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ usernamenotfound: "Username not found" })
//     }})

//     // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//         if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//             id: user.id,
//             name: user.name
//         };// Sign token
//         jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//             expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//             res.json({
//                 success: true,
//                 token: "Bearer " + token
//             });
//             }
//         );
//         } else {
//         return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//         }
//     });
// });

//routes for client dashboard
const ProfileController = require('../../controllers/ProfileController');
//get profile
// router.get('/profile',verifyToken, ProfileController.getProfile);
//update profile
// router.put('/profile',verifyToken, ProfileController.updateProfile);

module.exports = router;