#!/bin/env node
'use strict';

const Promise = require('bluebird');

const db = require('./src/db');
const server = require('./src/server');

require('./src/log')();

Promise.try(() => {
  if (process.getuid() !== 0) {
    logInfo('Please run ETdb as root!');
    logInfo('ETdb will drop to the user and group given in config.json.');
    throw new Error('Missing privileges');
  }
})
.then(db.connect())
.then(server.start)
.catch((err) => {
  logError('Startup sequence was interrupted by an error:');
  logError(err.message);
  logVerbose(err.stack, true);
  process.exit(1);
});
