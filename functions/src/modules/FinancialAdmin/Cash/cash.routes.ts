import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import uploadFile from '@middlewares/uploadFileMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './cash.controller';

const router = Router();
const uploadRouter = withMiddleware(
  router,
  uploadFile(['.png', '.PNG', '.JPG', '.jpg'], 'lampiran', true)
);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllCash);
uploadHandleRouter.post('/', controller.createCash);
uploadHandleRouter.put('/:uid', controller.updateCash);
errorHandledRoute.get(':uid', controller.getCashById);
errorHandledRoute.delete('/:uid', controller.deleteCashById);

export default router;
