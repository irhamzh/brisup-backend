import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from './rekreasi.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/recreation', controller.getAllRekreasi);
errorHandledRoute.post('/recreation', controller.createRekreasi);
errorHandledRoute.put('/recreation/:uid', controller.updateRekreasi);
errorHandledRoute.get('/recreation/:uid', controller.getRekreasiById);
errorHandledRoute.delete('/recreation/:uid', controller.deleteRekreasiById);

export default router;
