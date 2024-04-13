const mongoose = require('mongoose');

const secretarySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  society: { type: String },
});

const secretary = mongoose.model('secretary', secretarySchema);
module.exports = secretary;
