#!/bin/env node
/* global logWarn logError logDebug */
'use strict';

let log = require('./src/log')();
logWarn('warn test');
log.warn('direct warn');
logError('error test');
logDebug('debug test');
