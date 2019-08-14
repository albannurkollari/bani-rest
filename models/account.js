const {model, Schema} = require('mongoose');

module.exports = model('Account', Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lastOnline: {
    type: Date
  },
  passwordReset: {
    attempts: {
      type: new Schema({
        total: Number,
        successfull: Number
      })
    },
    collection: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
}));
