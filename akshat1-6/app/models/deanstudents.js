const mongoose = require('mongoose');

const deanstudentsSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
});

const deanstudents = mongoose.model('deanstudents', deanstudentsSchema);
module.exports = deanstudents;
