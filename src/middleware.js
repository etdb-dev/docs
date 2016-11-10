'use strict';

const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const db = require.main.require('./src/db');

let middleware = {};

middleware.validateToken = (req, res, next) => {

  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  logDebug('Validating token');
  if (token) {
    jwt.verify(token, 'matokensecret', (err, decoded) => {
      if (err && err.message === 'invalid token') {
        logWarn('Received token is invalid. Rejecting');
        return res.sendStatus(403);
      }
      logSuccess(`Token verifyed (uid=${decoded.user.name})`);
      req.decoded = decoded;
      next();
    });
  } else {
    logWarn('No token found');
    res.sendStatus(403);
  }
};

middleware.doBasicAuth = (req, res, next) => {
  logInfo('Validating basic auth data.');
  let userData = basicAuth(req) || { name: null, pass: null };
  let name = userData.name;
  let pass = userData.pass;
  logInfo(`username: ${name}`);
  logInfo(`password supplied: [${!pass ? ' ' : 'X'}]`);
  if (!userData || !name || !pass) {
    logWarn('Basic auth failed');
    return failAuthRequest(res);
  } else {
    logSuccess('Credentials accepted');
    Promise.try(() => {
      db.user.findOne({ username: userData.name }).then((userDoc) => {
        res.locals.tokenPayload = userDoc.getTokenData();
        return next();
      });
    });
  }
};

let failAuthRequest = (res) => {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.sendStatus(401);
};

module.exports = middleware;
