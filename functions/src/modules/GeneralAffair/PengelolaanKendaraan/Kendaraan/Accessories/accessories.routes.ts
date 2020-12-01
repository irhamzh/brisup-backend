import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './accessories.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/accessories', controller.getAllAccessories);
errorHandledRoute.post('/accessories', controller.createAccessories);
errorHandledRoute.put('/accessories/:uid', controller.updateAccessories);
errorHandledRoute.get('/accessories/:uid', controller.getAccessoriesById);
errorHandledRoute.delete('/accessories/:uid', controller.deleteAccessoriesById);

export default router;
