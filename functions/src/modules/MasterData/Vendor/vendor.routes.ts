import * as controller from './vendor.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllVendor);
errorHandledRoute.post('/', controller.createVendor);
errorHandledRoute.put('/:uid', controller.updateVendor);
errorHandledRoute.get('/:uid', controller.getVendorById);
errorHandledRoute.delete('/:uid', controller.deleteVendorById);

export default router;
