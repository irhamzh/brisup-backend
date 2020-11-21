import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pump_unit.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPumpUnit);
errorHandledRoute.post('/', controller.createPumpUnit);
errorHandledRoute.put('/:uid', controller.updatePumpUnit);
errorHandledRoute.get('/:uid', controller.getPumpUnitById);
errorHandledRoute.delete('/:uid', controller.deletePumpUnitById);

export default router;
