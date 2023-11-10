const mongoose = require('mongoose');

const UnapprovedUserSchema = new mongoose.Schema({
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

const UnapprovedUser = mongoose.model('UnapprovedUser', UnapprovedUserSchema, 'UnapprovedUser');

module.exports = UnapprovedUser;