import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './atk.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('procurement', 'read'),
  controller.getAllATKProcurement
);
errorHandledRoute.post(
  '/',
  accessMiddleware('procurement', 'create'),
  controller.createATKProcurement
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('procurement', 'update'),
  controller.updateATKProcurement
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('procurement', 'read'),
  controller.getATKProcurementById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('procurement', 'delete'),
  controller.deleteATKProcurementById
);

export default router;
