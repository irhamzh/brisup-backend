import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './tax.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/tax',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllTaxElastic
);
errorHandledRoute.post(
  '/tax',
  accessMiddleware('generalAffair', 'create'),
  controller.createTax
);
errorHandledRoute.put(
  '/tax/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateTax
);
errorHandledRoute.get(
  '/tax/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getTaxByIdElastic
);
errorHandledRoute.delete(
  '/tax/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteTaxById
);

export default router;
