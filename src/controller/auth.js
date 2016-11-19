'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../db/user');

let authController = {};

authController.getToken = (req, res, next) => {
  if (!canAccess(req, res, 'readAPI')) return;

  logDebug('Creating token');
  let tokenData = req.tokenPayload;
  let token = jwt.sign({
    username: tokenData.username,
    access: tokenData.access
  }, config.get('secret'), {
    expiresIn: '2h'
  });
  res.json({
    message: 'Token for evr\'body!',
    token: token
  });
};

authController.addUser = (req, res) => {
  if (!canAccess(req, res, 'manageUsers')) return;

  let data = req.body;
  let tokenData = req.tokenPayload;
  if (tokenData.username === data.username) {
    logWarn(`${data.username} tried to add himself.`);
    return res.status(409).json({
      message: 'Now, why would you want to add yourself again?'
    });
  }

  let user = new User({
    'username': data.username,
    'password': data.password
  });

  user.save().then(() => {
    let msg = `${data.username} has been createad`;
    logSuccess(msg + ' by ' + tokenData.username);
    res.status(201).json({
      message: `${data.username} has been createad`
    });
  }).catch(() => res.status(409).json({
    message: `user (${data.username}) already exists`
  }));
};

authController.deleteUser = (req, res) => {
  if (!canAccess(req, res, 'manageUsers')) return;

  User.findOneAndRemove({ username: req.params.uname }).then((deletedDoc) => {
    if (!deletedDoc) {
      logWarn(`User (uid=${req.params.uname}) not found`);
      res.sendStatus(404);
    } else {
      logSuccess(`${req.params.uname} has been deleted`);
      res.json({
        message: `${req.params.uname} has been deleted`
      });
    }
  });
};

let canAccess = (req, res, accessType) => {
  // Even though all /auth routes rely on Basic Auth,
  // req.tokenPayload is populated!
  // see: module:middleware.doBasicAuth
  let access = req.tokenPayload.access;
  if (access['isAdmin'] || access[accessType]) {
    return true;
  } else {
    logWarn(`Access denied to ${req.tokenPayload.username} on ${accessType}`);
    res.status(401).json({
      message: `You don't have the permission to ${accessType}.`
    });
    return false;
  }
};

module.exports = authController;
