const mongoose = require('mongoose');

//Test schema for database
const UserSchema = new mongoose.Schema({
  title: {
    fullName: String,
    username: String,
    password: String,
    email: String,
  }
});

module.exports = User = mongoose.model('User', UserSchema);

