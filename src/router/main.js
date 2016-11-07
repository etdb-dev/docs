'use strict';
const Promise = require('bluebird');
const mainRouter = require('express-promise-router')();

mainRouter.get('/', (req, res) => {
  return Promise.try(() => {
    res.status(418).end();
  }).then(() => logDebug('Answered / route [c=debug]GET[\\c]'));
});

module.exports = mainRouter;
