import { Router } from 'express';

import * as controller from './stock_opname.controller';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('procurement', 'read'),
  controller.getAllATKStockOpname
);
errorHandledRoute.post(
  '/',
  accessMiddleware('procurement', 'create'),
  controller.createATKStockOpname
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('procurement', 'update'),
  controller.updateATKStockOpname
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('procurement', 'read'),
  controller.getATKStockOpnameById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('procurement', 'delete'),
  controller.deleteATKStockOpnameById
);

export default router;
