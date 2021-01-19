import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './employee.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/employee',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllEmployee
);
errorHandledRoute.post(
  '/employee',
  accessMiddleware('generalAffair', 'create'),
  controller.createEmployee
);
errorHandledRoute.put(
  '/employee/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateEmployee
);
errorHandledRoute.get(
  '/employee/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getEmployeeById
);
errorHandledRoute.delete(
  '/employee/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteEmployeeById
);
uploadHandleRouter.post(
  '/employee/excel',
  accessMiddleware('generalAffair', 'create'),
  controller.importExcel
);

export default router;
