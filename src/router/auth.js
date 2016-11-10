'use strict';

const authRouter = require('express-promise-router')();
const authController = require('../controller/auth');
const middleware = require('../middleware');

authRouter.get('/auth', middleware.doBasicAuth, authController.getToken);
authRouter.post('/auth', middleware.doBasicAuth, authController.addUser);

module.exports = authRouter;
