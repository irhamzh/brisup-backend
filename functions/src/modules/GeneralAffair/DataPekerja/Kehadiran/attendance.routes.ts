import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './attendance.controller';

const router = Router();
const uploadRouter = withMiddleware(router, fileParser);
const errorHandledRoute = withErrorHandlerRoute(router);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get('/attendance', controller.getAllAttendance);
errorHandledRoute.post('/attendance', controller.createAttendance);
errorHandledRoute.put('/attendance/:uid', controller.updateAttendance);
errorHandledRoute.get('/attendance/:uid', controller.getAttendanceById);
errorHandledRoute.delete('/attendance/:uid', controller.deleteAttendanceById);
uploadHandleRouter.post('/attendance/excel', controller.importExcel);

export default router;
