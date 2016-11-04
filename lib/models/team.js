const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  teamName: {
    type: String,
    required: true
  },
  teamMembers: {
    type: Array
  },
  regionId: {
    type: Schema.Types.ObjectId,
    ref: 'Region'
  },
  region: {
    type: String
  },
  tiWinner: {
    type: Boolean
  }
});

module.exports = mongoose.model('Team', schema);