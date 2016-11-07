const apiRouter = require('express-promise-router')();

const authController = require.main.require('./src/controller/api/auth');
apiRouter.get('/auth', authController.tease);
apiRouter.get('/auth/*', authController.tease);
apiRouter.post('/auth/getKey', authController.getKey);

module.exports = apiRouter;
