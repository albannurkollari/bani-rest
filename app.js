// Libraries and enviromental configs
require('dotenv/config');
const ck = require('chalk');
const ex = require('express');
const fs = require('fs');
const jo = require('@hapi/joi');
const mg = require('mongoose');

// Constants
const METHODS = require('./constants/methods');

// Error constants (code:message)
const ERRORS = {
  1000: 'Express did not instantiate!',
  2000: 'Given `port` argument is not of a type Number!',
  3000: 'Failed to connect to MongoDB Atlas database!'
};

// Specific error class
class AppError extends Error {
  constructor (message) {
    if (message === undefined || message === null) {
      message = 'Missed passing error message?';
    }

    super(message);
    this.stack = this.stack.replace(/^Error/, this.constructor.name);
  }
}

const DIR = {
  AUTHORIZATION: './authorization',
  ROUTES: './routes',
  VALIDATION: './validation'
};

// Express requests class
class Router {
  constructor () {

    this.app = ex();

    if (!(this.app instanceof Object)) {
      throw new AppError(ERRORS[1000]);
    }

    this.app.use(ex.urlencoded({extended: true}));
    this.app.use(ex.json());

    let i = 1;

    // Initiate middlewares
    fs.readdirSync(DIR.ROUTES).map(file => {
      const _file = `/${file.replace(/\.js$/, '')}`;
      const routes = require(`${DIR.ROUTES}${_file}`);
      const router = ex.Router();

      routes.forEach(([path, methods]) =>
        Object
          .entries(methods)
          .forEach(([type, fn]) => {
            const method = METHODS[type];
            const symbol = ck.hex('#1e90ff')(i % 2 ? '└┬┴┬┘' : '┌┴┬┴┐');
            const httpMethod = ck.hex('#ffd36c')(method.toUpperCase());
            const fullPath = ck.hex('#6cfff9')(`${_file}${path}`);

            if (fs.existsSync(`${DIR.AUTHORIZATION}/${file}`)) {
              const authorizationFn = require(`${DIR.AUTHORIZATION}/${file}`)[path];

              if (authorizationFn instanceof Function) {
                router[method](path, authorizationFn);
              }
            };

            if (fs.existsSync(`${DIR.VALIDATION}/${file}`)) {
              const validationFn = require(`${DIR.VALIDATION}/${file}`)[path];

              if (validationFn instanceof Function) {
                router[method](path, validationFn);
              }
            };

            router[method](path, fn);

            console.log(`${symbol} ${ck.inverse(`[${i}]`)} -> {${httpMethod}} ${fullPath}`);
            i++;
          }));

      this.app.use(_file, router);
    });
  }
}

// Application class
class App extends Router {
  port = 3000

  constructor (port) {
    super();

    this.port = port || this.port;
    this.start = async () => {
      const connectionParams = {
        useCreateIndex: true,
        useNewUrlParser: true
      };

      try {
        await mg.connect(process.env.DB_CONNECTION, connectionParams, err => {
          if (err) {
            console.log(ck`{inverse {red {bold ${err}}}}`);
            throw new AppError(ERRORS[3000]);
          }

          console.log(ck`{inverse ${process.env.DB_CONNECTED_MSG}}`);
        });

        this.app.listen(this.port, () => console.log(ck`{inverse {blue Listening to {green http://localholst:${this.port}}}}`));
      }
      catch { /* Silent ignore */ }
    };
  }
}

// Start here
const Application = new App();

Application.start();

module.exports = Application;