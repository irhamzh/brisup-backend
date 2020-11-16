import * as controller from '@modules/Provider/provider.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllProvider);
errorHandledRoute.post('/', controller.createProvider);
errorHandledRoute.put('/:uid', controller.updateProvider);
errorHandledRoute.get('/:uid', controller.getProviderById);
errorHandledRoute.delete('/:uid', controller.deleteProviderById);

export default router;
