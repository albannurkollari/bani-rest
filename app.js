require('dotenv/config');
const ck = require('chalk');
const ex = require('express');
const fs = require('fs');
const mg = require('mongoose');

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
class Requests {
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

      this.app.use(_file, require(`${ROUTES_DIR}${_file}`));
    });
  }
}

// Application class
class App extends Requests {
  port = 3000

  constructor (port) {
    super();

    this.port = port || this.port;
    this.start = async () => {
      await mg.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, err => {
        if (err) {
          console.log(ck`{inverse {red {bold ${err}}}}`);
          throw new AppError(ERRORS[3000]);
        }

        console.log(ck`{inverse Connected to Bani's hafty-nifty-handcrafted database}`);
      });

      this.app.listen(this.port, () => console.log(ck`{inverse {blue Listening to {green http://localholst:${this.port}}}}`));
    };
  }
}

// Start here
const Application = new App();

Application.start();

module.exports = Application;