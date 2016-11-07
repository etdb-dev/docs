'use strict';

const config = require.main.require('./src/config');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let connect = () => {
  let options = config.redis;
  options.path = options.unixSocket;
  return redis.createClient(options);
};

module.exports = connect();
