// Libraries and enviromental configs
require('dotenv/config');
const ck = require('chalk');
const ex = require('express');
const fs = require('fs');
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
const ROUTES_DIR = './routes';

// Express requests class
class Router {
  constructor (app) {

    this.app = ex();

    if (!(this.app instanceof Object)) {
      throw new AppError(ERRORS[1000]);
    }

    this.app.use(ex.urlencoded({extended: true}));
    this.app.use(ex.json());

    // Initiate middlewares
    fs.readdirSync(ROUTES_DIR).map(file => {
      const _file = `/${file.replace(/\.js$/, '')}`;
      const routes = require(`${ROUTES_DIR}${_file}`);
      const router = ex.Router();

      routes.forEach(([path, methods]) =>
        Object
          .entries(methods)
          .forEach(([type, fn], i) => {
            const method = METHODS[type];
            const symbol = ck.hex('#1e90ff')(i + 1 === 2 ? '└┬┴┬┘' : '┌┴┬┴┐');
            const message = `[Route]: ${ck.hex('#ffd36c')(method.toUpperCase())} ->`;
            const fullPath = ck.hex('#6cfff9')(`${_file}${path}`);

            router[method](path, fn);

            console.log(`${symbol} ${message} ${fullPath}`)
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