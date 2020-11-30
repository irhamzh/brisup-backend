import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './consumption.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllConsumption);
errorHandledRoute.post('/', controller.createConsumption);
errorHandledRoute.put('/:uid', controller.updateConsumption);
errorHandledRoute.get('/:uid', controller.getConsumptionById);
errorHandledRoute.delete('/:uid', controller.deleteConsumptionById);

export default router;
