// Mongoose schemas
const Account = require('../models/account');

// Routes
module.exports = [
  ['/', {
    GET: async (_, res) => res.json(await Account.find()),
    POST: async ({body}, res) => res.json(await new Account(body).save())
  }],
  ['/:id', {
    GET: async ({params: {id}}, res) => res.json(await Account.findById(id)),
    PUT: async ({body}, res) => res.json(await Account(body).save())
  }]
];
