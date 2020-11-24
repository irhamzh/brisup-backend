import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './catering.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllCatering);
errorHandledRoute.post('/', controller.createCatering);
errorHandledRoute.put('/:uid', controller.updateCatering);
errorHandledRoute.get('/:uid', controller.getCateringById);
errorHandledRoute.delete('/:uid', controller.deleteCateringById);

export default router;
