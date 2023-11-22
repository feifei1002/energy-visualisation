const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
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


const PendingUser = mongoose.model('pendingUser', pendingUserSchema, 'pendingUser');

module.exports = PendingUser;