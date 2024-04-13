const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  society: { type: String },
});

const club = mongoose.model('club', clubSchema);
module.exports = club;
