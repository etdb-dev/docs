'use strict';

const jwt = require('jsonwebtoken');
const User = require('../db/user.js');

let authController = {};

authController.getToken = (req, res, next) => {
  if (!canAccess(req, res, 'readAPI')) return;

  logDebug('Creating token');
  let tokenData = req.tokenPayload;
  let token = jwt.sign({
    username: tokenData.username,
    access: tokenData.access
  }, 'matokensecret', {
    expiresIn: '2h'
  });
  res.json({
    success: true,
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
    res.json({
      message: `${data.username} has been createad`
    });
  }).catch(() => res.status(409).json({
    message: `user (${data.username}) already exists`
  }));
};

let canAccess = (req, res, accessType) => {
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
