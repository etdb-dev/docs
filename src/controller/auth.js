'use strict';

const jwt = require('jsonwebtoken');

let authController = {};

authController.getToken = (req, res, next) => {
  logDebug('Creating token');
  let token = jwt.sign({ user: res.locals.user }, 'matokensecret', {
    expiresIn: '2h'
  });
  res.json({
    success: true,
    message: 'Token for evr\'body!',
    token: token
  });
};

module.exports = authController;
