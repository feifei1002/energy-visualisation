const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        //this is assuming user ID is stored in the session or token (up to alex)
        const userId = req.user._id;
        const user = await User.findById(userId);
        res.json(user.profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile data' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body;
        const user = await User.findByIdAndUpdate(userId, { profile: updateData }, { new: true });
        res.json(user.profile);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile data' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};