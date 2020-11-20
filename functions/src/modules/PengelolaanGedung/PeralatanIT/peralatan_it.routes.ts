import * as controller from './peralatan_it.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPeralatanIT);
errorHandledRoute.post('/', controller.createPeralatanIT);
errorHandledRoute.put('/:uid', controller.updatePeralatanIT);
errorHandledRoute.get('/:uid', controller.getPeralatanITById);
errorHandledRoute.delete('/:uid', controller.deletePeralatanITById);

export default router;
