import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './overtime.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/overtime', controller.getAllOvertime);
errorHandledRoute.post('/overtime', controller.createOvertime);
errorHandledRoute.put('/overtime/:uid', controller.updateOvertime);
errorHandledRoute.get('/overtime/:uid', controller.getOvertimeById);
errorHandledRoute.delete('/overtime/:uid', controller.deleteOvertimeById);

export default router;
