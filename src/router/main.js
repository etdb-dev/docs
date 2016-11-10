'use strict';
const mainRouter = require('express-promise-router')();

mainRouter.get('/', (req, res) => {
  res.status(418).end();
  logDebug('Answered / route [c=debug]GET[\\c]');
});

module.exports = mainRouter;
