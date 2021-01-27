import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './driver.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/driver',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllDriverElastic
);
uploadHandleRouter.post(
  '/driver',
  accessMiddleware('generalAffair', 'create'),
  controller.createDriver
);
uploadHandleRouter.put(
  '/driver/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateDriver
);
errorHandledRoute.get(
  '/driver/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getDriverByIdElastic
);
errorHandledRoute.delete(
  '/driver/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteDriverById
);

export default router;
