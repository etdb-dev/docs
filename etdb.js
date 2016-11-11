#!/bin/env node
'use strict';

const _ = require('lodash');
const config = require('./src/config');
const db = require('./src/db');
require('./src/log')();

if (process.getuid() !== 0) {
  logError('Missing privileges');
  logInfo('Please run ETdb as root!');
  logInfo('ETdb will drop to the user and group given in config.json.');
  process.exit(0);
}

db.connect();

const mainApp = require('express')();
const routers = require('./src/routers');
const bodyParser = require('body-parser');

mainApp.use(bodyParser.json());
let routerKeys = _.keys(routers);
_.values(routers).forEach((router, idx) => {
  logVerbose('Registering router: ' + routerKeys[idx]);
  mainApp.use(router);
});
mainApp.listen(3000, () => {
  logSuccess('ETdb API server listening on 3000');
  logInfo(`Dropping privileges to ${config.get('uid')}:${config.get('gid')}`);
  process.setgid(config.get('gid'));
  process.setuid(config.get('uid'));
  logDebug(`user: ${process.getuid()}, group: ${process.getgid()}`);
});
