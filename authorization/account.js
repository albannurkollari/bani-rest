// Libraries
const jwt = require('jsonwebtoken');

// Constants
const {SETTINGS} = require('../constants/routes');

module.exports = {
  [SETTINGS]: (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
      res.status(401).json({isPermitted: false});
    }

    try {
      req.user = jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch {
      req.status(400).json({isValidToken: false});
    }
  }
}