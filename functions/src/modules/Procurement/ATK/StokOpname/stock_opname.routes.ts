import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './stock_opname.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllATKStockOpname);
errorHandledRoute.post('/', controller.createATKStockOpname);
errorHandledRoute.put('/:uid', controller.updateATKStockOpname);
errorHandledRoute.get('/:uid', controller.getATKStockOpnameById);
errorHandledRoute.delete('/:uid', controller.deleteATKStockOpnameById);

export default router;
