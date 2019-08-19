const {model, Schema} = require('mongoose');

const getDefaultName = () => ['John', 'Jane'][Math.round(Math.random())];
const getDefaultSurname = () => ['Doe', 'Snow'][Math.round(Math.random())];

module.exports = model('Account', Schema({
  firstName: {
    type: String,
    required: true,
    default: getDefaultName()
  },
  lastName: {
    type: String,
    required: true,
    default: getDefaultSurname()
  },
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
