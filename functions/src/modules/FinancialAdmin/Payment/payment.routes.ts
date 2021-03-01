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
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'read'
  ),
  controller.getAllPayment
);
errorHandledRoute.get(
  '/dashboard',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'dashboard'
  ),
  controller.dashboard
);
uploadHandleRouter.post(
  '/',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'create'
  ),
  controller.createPayment
);
uploadHandleRouter.put(
  '/:uid',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'update'
  ),
  controller.updatePayment
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'read'
  ),
  controller.getPaymentById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'delete'
  ),
  controller.deletePaymentById
);
errorHandledRoute.post(
  '/penihilan',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'create'
  ),
  controller.pengajuanPenihilan
);
errorHandledRoute.put('/penihilan/:uid/approve', controller.approvalPenihilan); //flow penihilan
errorHandledRoute.put('/penihilan/:uid/deny', controller.denyPenihilan); //flow penihilan
errorHandledRoute.put(
  '/:uid/approve-process',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'create'
  ),
  controller.approveProcess
);
errorHandledRoute.put(
  '/:uid/approve-supervisor',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'approvalSupervisor'
  ),
  controller.approveSupervisor
);
errorHandledRoute.put(
  '/:uid/approve-wabag',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'approvalWakabag'
  ),
  controller.approveWakabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'approvalKabag'
  ),
  controller.approveKabag
);
errorHandledRoute.put(
  '/:uid/finish',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'create'
  ),
  controller.approveFinish
);

export default router;
