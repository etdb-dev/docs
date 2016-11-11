'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const config = require('./config');
const mainApp = require('express')();
const routers = require('./routers');

let server = {};

server.start = () => {
  return new Promise((resolve) => {
    logInfo('Starting API server');

    mainApp.use(bodyParser.json());
    let routerKeys = _.keys(routers);
    _.values(routers).forEach((router, idx) => {
      logVerbose('Registering router: ' + routerKeys[idx]);
      mainApp.use(router);
    });

    let cfg = config.get('server');
    let port = cfg.port || 3000;
    let bind = cfg.bind || '127.0.0.1';
    mainApp.listen(port, bind, () => {
      logSuccess(`API server listening on ${bind}:${port}`);
      return resolve();
    });
  });
};

module.exports = server;
