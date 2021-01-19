import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './aps.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/aps',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllAPS
);
errorHandledRoute.post(
  '/aps',
  accessMiddleware('generalAffair', 'create'),
  controller.createAPS
);
errorHandledRoute.put(
  '/aps/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateAPS
);
errorHandledRoute.get(
  '/aps/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getAPSById
);
errorHandledRoute.delete(
  '/aps/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteAPSById
);

export default router;
