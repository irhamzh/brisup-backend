import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './security.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/security',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllSecurity
);
uploadHandleRouter.post(
  '/security',
  accessMiddleware('generalAffair', 'create'),
  controller.createSecurity
);
uploadHandleRouter.put(
  '/security/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateSecurity
);
errorHandledRoute.get(
  '/security/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getSecurityById
);
errorHandledRoute.delete(
  '/security/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteSecurityById
);

export default router;
