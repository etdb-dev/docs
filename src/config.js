'use strict';

const nconf = require('nconf');

let config = {};

config.get = (key) => nconf.get(key);
config.set = (key, value) => nconf.set(key, value);
config.save = (cb) => nconf.save('config', cb);

nconf.argv().env();
nconf.file('config', process.cwd() + '/config.json');
nconf.file('package', process.cwd() + '/package.json');

module.exports = config;
