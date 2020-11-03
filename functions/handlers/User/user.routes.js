const { Router } = require('express');
const controller = require('./user.controller');
const {
  withErrorHandlerRoute,
} = require('../../routers/withErrorHandlerRoute');

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

// errorHandledRoute.get('/', controller.getAllExpedition);
// errorHandledRoute.get('/me', controller.getMyExpedition);
errorHandledRoute.post('/', controller.signup);
// errorHandledRoute.put('/:expeditionId', controller.updateExpedition);
// errorHandledRoute.delete('/:expeditionId', controller.deleteExpedition);

module.exports = router;
