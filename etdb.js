#!/bin/env node
'use strict';
const _ = require('lodash');
const config = require('./src/config');
require('./src/log')();
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
