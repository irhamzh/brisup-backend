import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './p3k.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/first-aid-kit',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllP3k
);
errorHandledRoute.post(
  '/first-aid-kit',
  accessMiddleware('generalAffair', 'create'),
  controller.createP3k
);
errorHandledRoute.put(
  '/first-aid-kit/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateP3k
);
errorHandledRoute.get(
  '/first-aid-kit/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getP3kById
);
errorHandledRoute.delete(
  '/first-aid-kit/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteP3kById
);

export default router;
