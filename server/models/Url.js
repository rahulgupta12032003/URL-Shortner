const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  hashedUrl: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '10m' } // Expires after 60 seconds (1 minute)
  }
});

module.exports = mongoose.model('Url', urlSchema);
