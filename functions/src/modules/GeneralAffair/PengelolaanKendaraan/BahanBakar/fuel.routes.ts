import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './fuel.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllFuel
);
errorHandledRoute.post(
  '/',
  accessMiddleware('generalAffair', 'create'),
  controller.createFuel
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateFuel
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getFuelById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteFuelById
);

export default router;
