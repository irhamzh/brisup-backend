import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import uploadFile from '@middlewares/uploadFileMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './payment.controller';

const router = Router();
const uploadRouter = withMiddleware(
  router,
  uploadFile(['.png', '.PNG', '.JPG', '.jpg'], 'lampiran', true)
);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPayment);
uploadHandleRouter.post('/', controller.createPayment);
// uploadHandleRouter.put('/:uid', controller.updatePayment);
errorHandledRoute.get(':uid', controller.getPaymentById);
errorHandledRoute.delete('/:uid', controller.deletePaymentById);

export default router;
