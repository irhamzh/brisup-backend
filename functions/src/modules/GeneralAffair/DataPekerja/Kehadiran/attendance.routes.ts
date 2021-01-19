import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './attendance.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/attendance',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllAttendance
);
errorHandledRoute.post(
  '/attendance',
  accessMiddleware('generalAffair', 'create'),
  controller.createAttendance
);
errorHandledRoute.put(
  '/attendance/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateAttendance
);
errorHandledRoute.get(
  '/attendance/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getAttendanceById
);
errorHandledRoute.delete(
  '/attendance/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteAttendanceById
);
uploadHandleRouter.post(
  '/attendance/excel',
  accessMiddleware('generalAffair', 'create'),
  controller.importExcel
);

export default router;
