import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './tax.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllTax
);
errorHandledRoute.post(
  '/',
  accessMiddleware('masterData', 'create'),
  controller.createTax
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateTax
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getTaxById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteTaxById
);

export default router;
