const mongoose = require('mongoose');

//im guessing this schema for now, dont think its in my user story to make it?
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    name: String,
    password: String, //please please please store HASHED passwords only when you do the registration
});

const User = mongoose.model('User', userSchema);

module.exports = User;