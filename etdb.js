#!/bin/env node
'use strict';

const Promise = require('bluebird');
const fs = require('fs');

const db = require('./src/db');
const server = require('./src/server');
const config = require('./src/config');

require('./src/log')();

const writePidFile = () => fs.writeFileSync(process.cwd() + '/pid', process.pid + '\n');
const removePidFile = () => fs.unlinkSync(process.cwd() + '/pid');

process.on('exit', removePidFile);
process.on('SIGINT', () => {
  process.exit(0);
});

Promise.try(() => {
  if (process.getuid() !== 0) {
    logInfo('Please run ETdb as root!');
    logInfo('ETdb will drop to the user and group given in config.json.');
    throw new Error('Missing privileges');
  } else {
    process.setgid(config.get('gid'));
    process.setuid(config.get('uid'));
    logInfo(`Dropped privileges to ${process.geteuid()}:${process.getegid()}`);
  }
  writePidFile();
})
.then(db.connect)
.then(server.start)
.catch((err) => {
  logError('Startup sequence was interrupted by an error:');
  logError(err.message);
  logVerbose(err.stack, true);
  process.exit(1);
});
