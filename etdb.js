#!/bin/env node
'use strict';

const Promise = require('bluebird');

const db = require('./src/db');
const server = require('./src/server');
const config = require('./src/config');

require('./src/log')();

Promise.try(() => {
  if (process.getuid() !== 0) {
    logInfo('Please run ETdb as root!');
    logInfo('ETdb will drop to the user and group given in config.json.');
    throw new Error('Missing privileges');
  } else {
    process.setgid(config.get('gid'));
    process.setuid(config.get('uid'));
    logInfo(`Dropped privileges to ${process.getuid()}:${process.getgid()}`);
  }
})
.then(db.connect)
.then(server.start)
.catch((err) => {
  logError('Startup sequence was interrupted by an error:');
  logError(err.message);
  logVerbose(err.stack, true);
  process.exit(1);
});
