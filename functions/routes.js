const { Router } = require('express');
const userRouter = require('./handlers/User/user.routes');

const apiRouter = Router();

apiRouter.use('/users', userRouter);

exports.useApiRouter = (app) => {
  app.use('/v1', apiRouter);
};
