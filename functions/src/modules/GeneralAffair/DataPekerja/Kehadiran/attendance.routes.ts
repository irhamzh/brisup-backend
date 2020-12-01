import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './attendance.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/attendance', controller.getAllAttendance);
errorHandledRoute.post('/attendance', controller.createAttendance);
errorHandledRoute.put('/attendance/:uid', controller.updateAttendance);
errorHandledRoute.get('/attendance/:uid', controller.getAttendanceById);
errorHandledRoute.delete('/attendance/:uid', controller.deleteAttendanceById);

export default router;
