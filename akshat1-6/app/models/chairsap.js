const mongoose = require('mongoose');

const chairsapSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
});

const chairsap = mongoose.model('chairsap', chairsapSchema);
module.exports = chairsap;
