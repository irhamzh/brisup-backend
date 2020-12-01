import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './service.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/service', controller.getAllService);
errorHandledRoute.post('/service', controller.createService);
errorHandledRoute.put('/service/:uid', controller.updateService);
errorHandledRoute.get('/service/:uid', controller.getServiceById);
errorHandledRoute.delete('/service/:uid', controller.deleteServiceById);

export default router;
