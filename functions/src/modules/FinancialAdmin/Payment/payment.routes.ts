import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import uploadFile from '@middlewares/uploadFileMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
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

errorHandledRoute.get(
  '/',
  accessMiddleware('financialAdmin', 'read'),
  controller.getAllPayment
);
errorHandledRoute.get(
  '/dashboard',
  accessMiddleware('financialAdmin', 'dashboard'),
  controller.dashboard
);
uploadHandleRouter.post(
  '/',
  accessMiddleware('financialAdmin', 'create'),
  controller.createPayment
);
uploadHandleRouter.put(
  '/:uid',
  accessMiddleware('financialAdmin', 'update'),
  controller.updatePayment
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('financialAdmin', 'read'),
  controller.getPaymentById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('financialAdmin', 'delete'),
  controller.deletePaymentById
);
errorHandledRoute.post(
  '/penihilan',
  accessMiddleware('financialAdmin', 'create'),
  controller.pengajuanPenihilan
);
errorHandledRoute.put('/penihilan/:uid/approve', controller.approvalPenihilan); //flow penihilan
errorHandledRoute.put(
  '/:uid/approve-process',
  accessMiddleware('financialAdmin', 'create'),
  controller.approveProcess
);
errorHandledRoute.put(
  '/:uid/approve-supervisor',
  accessMiddleware('generalAffair', 'approvalSupervisor'),
  controller.approveSupervisor
);
errorHandledRoute.put(
  '/:uid/approve-wabag',
  accessMiddleware('financialAdmin', 'approvalWakabag'),
  controller.approveWakabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag',
  accessMiddleware('financialAdmin', 'approvalKabag'),
  controller.approveKabag
);
errorHandledRoute.put(
  '/:uid/finish',
  accessMiddleware('financialAdmin', 'create'),
  controller.approveFinish
);

export default router;
