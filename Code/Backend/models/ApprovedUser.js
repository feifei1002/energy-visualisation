const mongoose = require('mongoose');

const approvedUserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    approved: {
        type: Boolean,
        default: false
    }
});

const ApprovedUser = mongoose.model('ApprovedUser', approvedUserSchema, 'ApprovedUser');

module.exports = ApprovedUser;