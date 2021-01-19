import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './overtime.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/overtime',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllOvertime
);
errorHandledRoute.post(
  '/overtime',
  accessMiddleware('generalAffair', 'create'),
  controller.createOvertime
);
errorHandledRoute.put(
  '/overtime/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateOvertime
);
errorHandledRoute.get(
  '/overtime/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getOvertimeById
);
errorHandledRoute.delete(
  '/overtime/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteOvertimeById
);

export default router;
