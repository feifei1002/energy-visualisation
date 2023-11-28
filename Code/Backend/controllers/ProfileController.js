const User = require('../models/User');
const bcrypt = require("bcrypt");
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash
const jwt = require('jsonwebtoken');
const {expressjwt} = require("express-jwt");
const key = process.env.ACCESS_TOKEN;

// const verifyToken = expressjwt({
//     secret: key,
//     algorithms: ['HS256'],
//     getToken: function (request) {
//         const token = request.headers.authorization;
//         console.log('Decoded Token:', jwt.decode(token, { complete: true }));
//         if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
//             return request.headers.authorization.split(' ')[1];
//         } else if (request.query && request.query.token) {
//             return request.query.token;
//         }
//         return null;
//     },
// });

// Moved this logic to the api/profile file as that is where it works see the file

// const getProfile = async (user, response) => {
//     try {
//         //placeholder until alex merges how he will be handling logged in users
//         // const userId = request.auth._id;
//         // const userId = "6547a45b34f0a29c8b36978f"; //this is temporary until login functionality and session ids get added
        
//         console.log(user);

//         if(!user) {
//             return response.status(404).json({ message: 'User not found' });
//         }
//         response.json(user);
//     } catch (error) {
//         console.error('Error fetching profile data:', error);
//         response.status(500).json({ message: 'Error fetching profile data' });
//     }
// };

//You may need to move this to the api file too
const updateProfile = async (request, response) => {
    try {
        const userId = request.user._id;
        // const userId = "6547a45b34f0a29c8b36978f"; //this is temporary until login functionality and session ids get added
        const updateData = request.body;

        //if updating the password we hash it before saving it
        if (updateData.newPassword) {
            updateData.password = await bcrypt.hash(updateData.newPassword, saltRounds);
            delete updateData.newPassword;
        }

        const user = await User.findByIdAndUpdate(userId, { profile: updateData }, { new: true }).select('-password');
        response.json(user);
    } catch (error) {
        console.error('Error updating profile data:', error);
        response.status(500).json({ message: 'Error updating profile data' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    // verifyToken
};