import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './item.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);
const protectedRouter = withAuthMiddleware(errorHandledRoute);

protectedRouter.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllItem
);
protectedRouter.post(
  '/',
  accessMiddleware('masterData', 'create'),
  controller.createItem
);
protectedRouter.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateItem
);
protectedRouter.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getItemById
);
protectedRouter.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteItemById
);

export default router;
