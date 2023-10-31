const mongoose = require('mongoose');

//Test schema
const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = Test = mongoose.model('test', TestSchema);