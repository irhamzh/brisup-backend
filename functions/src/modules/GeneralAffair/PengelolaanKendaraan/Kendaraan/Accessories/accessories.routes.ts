import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './accessories.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/accessories',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllAccessories
);
errorHandledRoute.post(
  '/accessories',
  accessMiddleware('generalAffair', 'create'),
  controller.createAccessories
);
errorHandledRoute.put(
  '/accessories/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateAccessories
);
errorHandledRoute.get(
  '/accessories/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getAccessoriesById
);
errorHandledRoute.delete(
  '/accessories/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteAccessoriesById
);

export default router;
