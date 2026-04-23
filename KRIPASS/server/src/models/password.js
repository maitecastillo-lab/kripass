const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }, // encriptada
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Password', passwordSchema);