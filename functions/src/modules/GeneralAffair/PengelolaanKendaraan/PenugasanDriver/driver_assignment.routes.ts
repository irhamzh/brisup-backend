import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './driver_assignment.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllDriverAssignment);
errorHandledRoute.post('/', controller.createDriverAssignment);
errorHandledRoute.put('/:uid', controller.updateDriverAssignment);
errorHandledRoute.get('/:uid', controller.getDriverAssignmentById);
errorHandledRoute.delete('/:uid', controller.deleteDriverAssignmentById);

export default router;
