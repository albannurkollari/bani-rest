// Mongoose schemas
const Char = require('../models/char');

// Routes
module.exports = [
  ['/', {
    GET: async (_, res) => res.json(await Char.find()),
    POST: async ({body}, res) => res.json(await new Char(body).save())
  }]
];
