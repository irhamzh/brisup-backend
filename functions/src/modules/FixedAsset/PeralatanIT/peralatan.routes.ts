import * as controller from './peralatan.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPeralatan);
errorHandledRoute.post('/', controller.createPeralatan);
errorHandledRoute.put('/:uid', controller.updatePeralatan);
errorHandledRoute.get('/:uid', controller.getPeralatanById);
errorHandledRoute.delete('/:uid', controller.deletePeralatanById);

export default router;
