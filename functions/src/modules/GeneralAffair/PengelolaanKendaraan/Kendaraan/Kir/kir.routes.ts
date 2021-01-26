import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './kir.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/kir',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllKIRElastic
);
errorHandledRoute.post(
  '/kir',
  accessMiddleware('generalAffair', 'create'),
  controller.createKIR
);
errorHandledRoute.put(
  '/kir/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateKIR
);
errorHandledRoute.get(
  '/kir/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getKIRByIdElastic
);
errorHandledRoute.delete(
  '/kir/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteKIRById
);

export default router;
