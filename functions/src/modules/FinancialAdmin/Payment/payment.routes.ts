import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import uploadFile from '@middlewares/uploadFileMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './payment.controller';

const router = Router();

const protectedRouter = withAuthMiddleware(router);
const uploadRouter = withMiddleware(
  protectedRouter,
  uploadFile(['.png', '.PNG', '.JPG', '.jpg'], 'lampiran', true)
);

const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get('/', controller.getAllPayment);
errorHandledRoute.get('/dashboard', controller.dashboard);
uploadHandleRouter.post('/', controller.createPayment);
uploadHandleRouter.put('/:uid', controller.updatePayment);
errorHandledRoute.get('/:uid', controller.getPaymentById);
errorHandledRoute.delete('/:uid', controller.deletePaymentById);
errorHandledRoute.post('/penihilan/pengajuan', controller.pengajuanPenihilan);
errorHandledRoute.put('/penihilan/:uid/approve', controller.approvalPenihilan);
errorHandledRoute.put('/:uid/approve-process', controller.approveProcess);
errorHandledRoute.put('/:uid/approve-wabag', controller.approveWabag);
errorHandledRoute.put('/:uid/approve-kabag', controller.approveKabag);
errorHandledRoute.put('/:uid/finish', controller.approveFinish);

export default router;
