'use strict';

const apiRouter = require('express-promise-router')();
const apiController = require.main.require('./src/controller/api');
const middleware = require.main.require('./src/middleware');

apiRouter.use('/api', middleware.validateToken);

apiRouter.get('/api/v1/', apiController.home);
apiRouter.get('/api/v1/protected', apiController.protected);

module.exports = apiRouter;
