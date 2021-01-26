import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './courier.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/courier',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllCourierElastic
);
uploadHandleRouter.post(
  '/courier',
  accessMiddleware('generalAffair', 'create'),
  controller.createCourier
);
uploadHandleRouter.put(
  '/courier/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateCourier
);
errorHandledRoute.get(
  '/courier/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getCourierByIdElastic
);
errorHandledRoute.delete(
  '/courier/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteCourierById
);

export default router;
