import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/WorkingOrder/working_order.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware(['fixedAsset', 'procurement', 'generalAffair'], 'read'),
  controller.getAllWorkingOrder
);
errorHandledRoute.get(
  '/dashboard',
  accessMiddleware('generalAffair', 'dashboard'),
  controller.dashboard
);
errorHandledRoute.post(
  '/',
  accessMiddleware(['fixedAsset', 'procurement', 'generalAffair'], 'create'),
  controller.createWorkingOrder
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware(['fixedAsset', 'procurement', 'generalAffair'], 'update'),
  controller.updateWorkingOrder
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware(['fixedAsset', 'procurement', 'generalAffair'], 'read'),
  controller.getWorkingOrderById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware(['fixedAsset', 'procurement', 'generalAffair'], 'delete'),
  controller.deleteWorkingOrderById
);
errorHandledRoute.put(
  '/:uid/approve-process',
  accessMiddleware('generalAffair', 'create'),
  controller.approveProcess
);
errorHandledRoute.put(
  '/:uid/approve-supervisor',
  accessMiddleware('generalAffair', 'approvalSupervisor'),
  controller.approveSupervisor
);
errorHandledRoute.put(
  '/:uid/approve-wabag',
  accessMiddleware('generalAffair', 'approvalWakabag'),
  controller.approveWakabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag',
  accessMiddleware('generalAffair', 'approvalKabag'),
  controller.approveKabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag-wakabag',
  controller.approveKabagWakabag
);
errorHandledRoute.put(
  '/:uid/finish',
  accessMiddleware('generalAffair', 'create'),
  controller.approveFinish
);

export default router;
