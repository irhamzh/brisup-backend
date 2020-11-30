import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './vehicle.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllVehicle);
errorHandledRoute.post('/', controller.createVehicle);
errorHandledRoute.put('/:uid', controller.updateVehicle);
errorHandledRoute.get('/:uid', controller.getVehicleById);
errorHandledRoute.delete('/:uid', controller.deleteVehicleById);

export default router;
