import * as controller from '@modules/FixedAsset/Pengadaan/PurchaseOrder/purchase_order.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPurchaseOrder);
errorHandledRoute.post('/', controller.createPurchaseOrder);
errorHandledRoute.put('/:uid', controller.updatePurchaseOrder);
errorHandledRoute.get('/:uid', controller.getPurchaseOrderById);
errorHandledRoute.delete('/:uid', controller.deletePurchaseOrderById);

export default router;
