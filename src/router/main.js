'use strict';
const mainRouter = require('express-promise-router')();
const authController = require('../controller/auth');
const middleware = require('../middleware');

mainRouter.get('/', (req, res) => {
  res.status(418).end();
  logDebug('Answered / route [c=debug]GET[\\c]');
});

mainRouter.get('/auth', middleware.doBasicAuth, authController.getToken);

module.exports = mainRouter;
