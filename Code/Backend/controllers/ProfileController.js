const User = require('../models/User');

const getProfile = async (request, response) => {
    try {
        //this is assuming user ID is stored in the session or token (up to alex)
        const userId = request.user._id;
        const user = await User.findById(userId);
        response.json(user.profile);
    } catch (error) {
        response.status(500).json({ message: 'Error fetching profile data' });
    }
};

const updateProfile = async (request, response) => {
    try {
        const userId = request.user._id;
        const updateData = request.body;
        const user = await User.findByIdAndUpdate(userId, { profile: updateData }, { new: true });
        response.json(user.profile);
    } catch (error) {
        response.status(500).json({ message: 'Error updating profile data' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};