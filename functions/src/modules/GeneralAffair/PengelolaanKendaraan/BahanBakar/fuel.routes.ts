import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './fuel.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllFuel);
errorHandledRoute.post('/', controller.createFuel);
errorHandledRoute.put('/:uid', controller.updateFuel);
errorHandledRoute.get('/:uid', controller.getFuelById);
errorHandledRoute.delete('/:uid', controller.deleteFuelById);

export default router;
