import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './tax.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/tax', controller.getAllTax);
errorHandledRoute.post('/tax', controller.createTax);
errorHandledRoute.put('/tax/:uid', controller.updateTax);
errorHandledRoute.get('/tax/:uid', controller.getTaxById);
errorHandledRoute.delete('/tax/:uid', controller.deleteTaxById);

export default router;
