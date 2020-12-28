import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './uker.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);
const protectedRouter = withAuthMiddleware(errorHandledRoute);

protectedRouter.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllUker
);
protectedRouter.post(
  '/',
  accessMiddleware('masterData', 'create'),
  controller.createUker
);
protectedRouter.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateUker
);
protectedRouter.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getUkerById
);
protectedRouter.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteUkerById
);

export default router;
