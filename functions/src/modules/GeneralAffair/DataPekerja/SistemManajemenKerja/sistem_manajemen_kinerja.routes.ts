import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './sistem_manajemen_kinerja.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllPerformanceManagement
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getPerformanceManagementById
);
errorHandledRoute.post(
  '/',
  accessMiddleware('generalAffair', 'create'),
  controller.createPerformanceManagement
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updatePerformanceManagement
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deletePerformanceManagementById
);
uploadHandleRouter.post(
  '/excel',
  accessMiddleware('generalAffair', 'create'),
  controller.importExcel
);

export default router;
