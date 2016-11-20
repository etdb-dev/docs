'use strict';

const authRouter = require('express-promise-router')();
const authController = require('../controller/auth');
const middleware = require('../middleware');

authRouter.use('/auth', middleware.doBasicAuth);

authRouter.get('/auth', authController.getToken);
authRouter.post('/auth', authController.addUser);

authRouter.put('/auth/:uname', authController.updateUser);
authRouter.delete('/auth/:uname', authController.deleteUser);

module.exports = authRouter;
