'use strict';

const nconf = require('nconf');

nconf.argv().env();
nconf.file('config', process.cwd() + '/config.json');
nconf.file('package', process.cwd() + '/package.json');

module.exports = nconf;
