'use strict';

/**
 * Simple config object.
 * Holds config.json and package.json only, for now.
 * Maybe extend with nconf.
 * @module src/config
 */

/**
 * Parsed content of config.json
 * @type {Object}
 * @property {Object} package Parsed content of package.json
 * @static
 */
let config = require('../config.json');
config.package = require('../package.json');

module.exports = config;
