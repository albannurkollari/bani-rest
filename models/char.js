const mg = require('mongoose');

// Schema
module.exports = mg.model('Char', mg.Schema({
  name: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  server: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}));