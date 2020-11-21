import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './water_meter.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllWaterMeter);
errorHandledRoute.post('/', controller.createWaterMeter);
errorHandledRoute.put('/:uid', controller.updateWaterMeter);
errorHandledRoute.get('/:uid', controller.getWaterMeterById);
errorHandledRoute.delete('/:uid', controller.deleteWaterMeterById);

export default router;
