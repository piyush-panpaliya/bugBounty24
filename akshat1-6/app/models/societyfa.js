const mongoose = require('mongoose');

const societyfaSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  society: { type: String },
});

const societyfa = mongoose.model('societyfa', societyfaSchema);
module.exports = societyfa;
