import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './rekreasi.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/recreation',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllRekreasi
);
errorHandledRoute.post(
  '/recreation',
  accessMiddleware('generalAffair', 'create'),
  controller.createRekreasi
);
errorHandledRoute.put(
  '/recreation/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateRekreasi
);
errorHandledRoute.get(
  '/recreation/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getRekreasiById
);
errorHandledRoute.delete(
  '/recreation/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteRekreasiById
);

export default router;
