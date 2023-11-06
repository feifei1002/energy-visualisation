const User = require('../models/User');
const bcrypt = require("bcrypt");
const saltRounds = 10; //increasing this increases security to bruteforce but also time it takes to hash

const getProfile = async (request, response) => {
    try {
        //placeholder until alex merges how he will be handling logged in users
        //const userId = request.user._id;
        const userId = "6547a45b34f0a29c8b36978f"; //this is temporary until login functionality and session ids get added
        const user = await User.findById(userId).select('fullName username email'); //to exclude the password field
        response.json(user);
    } catch (error) {
        console.error('Error fetching profile data:', error);
        response.status(500).json({ message: 'Error fetching profile data' });
    }
};

const updateProfile = async (request, response) => {
    try {
        //const userId = request.user._id;
        const userId = "6547a45b34f0a29c8b36978f"; //this is temporary until login functioanlity and session ids get added
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
    updateProfile
};