'use strict';

const jwt = require('jsonwebtoken');
const User = require('../db/user.js');

let authController = {};

authController.getToken = (req, res, next) => {
  if (!canAccess(res, 'readAPI')) return;

  logDebug('Creating token');
  let tokenData = res.locals.tokenPayload;
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
  if (!canAccess(res, 'manageUsers')) return;

  let data = req.body;
  let tokenData = res.locals.tokenPayload;
  if (tokenData.username === data.username) {
    logWarn(`${data.username} tried to add himself.`);
    return res.status(409).json({
      message: 'Now, why would you want to add yourself again? Try PUT-ing onto this address to update your own data!'
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

let canAccess = (res, accessType) => {
  let access = res.locals.tokenPayload.access;
  if (access['isAdmin'] || access[accessType]) {
    return true;
  } else {
    res.status(401).json({
      message: `You don't have the permission to ${accessType}.`
    });
    return false;
  }
};

module.exports = authController;
