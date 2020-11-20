import { Router } from 'express';
import * as controller from './floor.controller';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllFloor);
errorHandledRoute.post('/', controller.createFloor);
errorHandledRoute.put('/:uid', controller.updateFloor);
errorHandledRoute.get('/:uid', controller.getFloorById);
errorHandledRoute.delete('/:uid', controller.deleteFloorById);

export default router;
