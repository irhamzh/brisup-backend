import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './external_vehicle.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllExternalVehicle);
errorHandledRoute.post('/', controller.createExternalVehicle);
errorHandledRoute.put('/:uid', controller.updateExternalVehicle);
errorHandledRoute.get('/:uid', controller.getExternalVehicleById);
errorHandledRoute.delete('/:uid', controller.deleteExternalVehicleById);

export default router;
