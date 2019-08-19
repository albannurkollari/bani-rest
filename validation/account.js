//Libraries
const joi = require('@hapi/joi');

// Constants
const {CREATE} = require('../constants/routes');

const accountSchema = {
  firstName: joi.string().min(2).required(),
  lastName: joi.string().min(2).required(),
  email: joi.string().min(2).email().required(),
  password: joi.string().min(6).required()
};

module.exports = {
  [CREATE]: ({body}, res, next) => {
    const {error} = joi.validate(body, accountSchema);

    if (error && error.details) {
      res.status(400).send(error.details.map(({message}) => message).join('\n'));

      return;
    }
    
    next();
  }
};
