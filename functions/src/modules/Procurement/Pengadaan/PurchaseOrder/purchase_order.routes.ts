import { Router } from 'express';
import * as controller from './purchase_order.controller';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('procurement', 'read'),
  controller.getAllPurchaseOrder
);
errorHandledRoute.post(
  '/',
  accessMiddleware('procurement', 'create'),
  controller.createPurchaseOrder
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('procurement', 'update'),
  controller.updatePurchaseOrder
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('procurement', 'read'),
  controller.getPurchaseOrderById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('procurement', 'delete'),
  controller.deletePurchaseOrderById
);

export default router;
