const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  region: {
    type: String,
    required: true
  },
  teams: {
    type: Array
  }
});

module.exports = mongoose.model('Region', schema);