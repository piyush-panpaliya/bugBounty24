const mongoose = require('mongoose');

const clubfaSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  club: { type: String },
  society: { type: String },
});

const clubfa = mongoose.model('clubfa', clubfaSchema);
module.exports = clubfa;
