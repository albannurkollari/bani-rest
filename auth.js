const Joi = require('@hapi/joi');
const router = require('express').Router();
const Account = require('./models/account');

const schema = {
  name: Joi.string().min(6).required(true)
};

module.exports = schema;
