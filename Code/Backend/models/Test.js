const mongoose = require('mongoose');

//Test schema for database
const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = Test = mongoose.model('test', TestSchema);