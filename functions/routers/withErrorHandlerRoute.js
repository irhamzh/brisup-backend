const { withErrorHandler } = require('express-kun');
const {
  errorHandlerMiddleware,
} = require('../middlewares/errorHandlerMiddleware');

exports.withErrorHandlerRoute = (router) => {
  return withErrorHandler(router, errorHandlerMiddleware);
};
