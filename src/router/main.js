'use strict';

const express = require('express');
const mainRouter = require('express-promise-router')();

mainRouter.get('/', (req, res) => {
  res.status(418).end();
  logDebug('Answered / route [c=debug]GET[\\c]');
});

mainRouter.use('/docs', express.static('docs/api'));

module.exports = mainRouter;
