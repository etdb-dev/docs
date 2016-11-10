'use strict';

const jwt = require('jsonwebtoken');
const User = require('../db/user.js');

let authController = {};

authController.getToken = (req, res, next) => {
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
  if (!res.locals.tokenPayload.access.manageUsers) {
    return res.status(401).json({
      message: 'You don\'t have the permission to add users.'
    });
  }
  let data = req.body;
  let user = new User({
    'username': data.username,
    'password': data.password,
    'access': {
      manageUsers: true,
      readAPI: true,
      writeAPI: true
    }
  });
  user.save().then(() => res.json({
    message: `${data.username} has been createad`
  })).catch(() => res.status(409).json({
    message: `user (${data.username}) already exists`
  }));
};

module.exports = authController;
