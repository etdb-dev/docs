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
    jwt.verify(token, 'matokensecret', (err, tokenPayload) => {
      let msg;
      if (err) {
        if (err.name === 'TokenExpiredError') {
          logWarn('Received expired token. Rejecting');
          msg = 'Your token has expired.';
        } else {
          logWarn('Received token is invalid. Rejecting');
          msg = 'Your token is invalid.';
        }
        return res.status(401).json({
          message: msg + ' Please authenticate again!'
        });
      }
      logSuccess(`Token verifyed (uid=${tokenPayload.username})`);
      req.tokenPayload = tokenPayload;
      next();
    });
  } else {
    logWarn('No token found');
    res.sendStatus(401);
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
