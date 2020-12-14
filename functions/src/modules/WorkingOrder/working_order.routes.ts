import { Router } from 'express';

import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/WorkingOrder/working_order.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get('/', controller.getAllWorkingOrder);
errorHandledRoute.get('/dashboard', controller.dashboard);
errorHandledRoute.post('/', controller.createWorkingOrder);
errorHandledRoute.put('/:uid', controller.updateWorkingOrder);
errorHandledRoute.get('/:uid', controller.getWorkingOrderById);
errorHandledRoute.delete('/:uid', controller.deleteWorkingOrderById);
errorHandledRoute.put('/:uid/approve-process', controller.approveProcess);
errorHandledRoute.put('/:uid/approve-wabag', controller.approveWabag);
errorHandledRoute.put('/:uid/approve-kabag', controller.approveKabag);
errorHandledRoute.put('/:uid/finish', controller.approveFinish);

export default router;
