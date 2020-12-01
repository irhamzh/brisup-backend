import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './kir.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/kir', controller.getAllKIR);
errorHandledRoute.post('/kir', controller.createKIR);
errorHandledRoute.put('/kir/:uid', controller.updateKIR);
errorHandledRoute.get('/kir/:uid', controller.getKIRById);
errorHandledRoute.delete('/kir/:uid', controller.deleteKIRById);

export default router;
