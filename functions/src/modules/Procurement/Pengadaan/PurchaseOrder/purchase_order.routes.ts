import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './purchase_order.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPurchaseOrder);
errorHandledRoute.post('/', controller.createPurchaseOrder);
errorHandledRoute.put('/:uid', controller.updatePurchaseOrder);
errorHandledRoute.get('/:uid', controller.getPurchaseOrderById);
errorHandledRoute.delete('/:uid', controller.deletePurchaseOrderById);

export default router;
