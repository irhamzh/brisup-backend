import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './driver_assignment.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllDriverAssignment
);
errorHandledRoute.post(
  '/',
  accessMiddleware('generalAffair', 'create'),
  controller.createDriverAssignment
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateDriverAssignment
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getDriverAssignmentById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteDriverAssignmentById
);

export default router;
