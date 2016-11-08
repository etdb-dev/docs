'use strict';
const Promise = require('bluebird');
const mainRouter = require('express-promise-router')();
const authController = require('../controller/auth');
const middleware = require('../middleware');

mainRouter.get('/', (req, res) => {
  return Promise.try(() => {
    res.status(418).end();
  }).then(() => logDebug('Answered / route [c=debug]GET[\\c]'));
});

mainRouter.get('/auth', middleware.doBasicAuth, authController.getToken);

module.exports = mainRouter;
