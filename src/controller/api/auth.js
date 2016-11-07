/* global logDebug */
'use strict';

const Promise = require('bluebird');
const redis = require.main.require('./src/promised-redis');

const authController = {
  getKey: (req, res) => {
    return Promise.try(() => {
      logDebug('Key requested');
      return 2567;
    }).then((val) => {
      logDebug(val);
      res.status(503).end();
    });
  },
  tease: (req, res) => {
    logDebug('Upping tease count');
    redis.hincrby('teaser', 'count', 1);
    res.json({
      message: 'Come at me, bro! I\'m listening...'
    });
  }
};

module.exports = authController;
