import * as controller from '@modules/FixedAsset/Pengadaan/WorkingOrder/working_order.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllWorkingOrder);
errorHandledRoute.post('/', controller.createWorkingOrder);
errorHandledRoute.put('/:uid', controller.updateWorkingOrder);
errorHandledRoute.get('/:uid', controller.getWorkingOrderById);
errorHandledRoute.delete('/:uid', controller.deleteWorkingOrderById);

export default router;
