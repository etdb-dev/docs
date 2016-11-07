#!/bin/env node
'use strict';

const _ = require('lodash');
const config = require('./src/config');
require('./src/log')();

if (process.getuid() !== 0) {
  logError('Missing privileges');
  logInfo('Please run ETdb as root!');
  logInfo('ETdb will drop to the privileges of the user and group given in config.json.');
  process.exit(0);
}

const mainApp = require('express')();
const routers = require('./src/routers');

mainApp.use(_.values(routers));
mainApp.listen(3000, () => {
  logSuccess('ETdb API server listening on 3000');
  logInfo(`Dropping privileges to ${config.uid}:${config.gid}`);
  process.setgid(config.gid);
  process.setuid(config.uid);
  logDebug(`user: ${process.getuid()}, group: ${process.getgid()}`);
});
