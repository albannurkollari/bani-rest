// Router
const router = require('express').Router();

// Mongoose schemas
const Char = require('../models/char');

// Constants
const METHODS = require('../constants/methods');

// Char routes
const ROUTES = {
  DEFAULT: {
    path: '/',
    methods: {
      [METHODS.GET]: async (_, res) => res.json(await Char.find()),
      [METHODS.POST]: async ({body}, res) => res.json(await new Char(body).save())
    }
  }
};

Object
  .entries(ROUTES)
  .forEach(([key, {path, methods}]) =>
    Object
      .entries(methods)
      .forEach(([method, fn]) => {
        router[method](path, fn);
        console.log(`Registered ${method.toUpperCase()} request for Chars => ${key}`)
      }));

module.exports = router;