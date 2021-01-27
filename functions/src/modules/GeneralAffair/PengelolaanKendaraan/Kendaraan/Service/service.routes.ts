import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './service.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/service',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllServiceElastic
);
errorHandledRoute.post(
  '/service',
  accessMiddleware('generalAffair', 'create'),
  controller.createService
);
errorHandledRoute.put(
  '/service/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateService
);
errorHandledRoute.get(
  '/service/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getServiceByIdElastic
);
errorHandledRoute.delete(
  '/service/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteServiceById
);

export default router;
