// Mongoose schemas
const Account = require('../models/account');

// Constants
const {DEFAULT_PATH, CREATE, ID} = require('../constants/routes');


// Routes
module.exports = [
  [DEFAULT_PATH, {
    GET: async (_, res) => res.json(await Account.find()),
    POST: async ({body}, res) => res.json(await new Account(body).save())
  }],
  [ID, {
    GET: async ({params: {id}}, res) => res.json(await Account.findById(id)),
    PUT: async ({body}, res) => res.json(await Account(body).save())
  }],
  [CREATE, {
    POST: async ({body}, res) => res.json(await new Account({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    }).save())
  }]
];
