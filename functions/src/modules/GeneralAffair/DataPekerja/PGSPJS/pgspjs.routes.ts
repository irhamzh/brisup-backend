import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pgspjs.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/pgspjs', controller.getAllPGSPJS);
errorHandledRoute.post('/pgspjs', controller.createPGSPJS);
errorHandledRoute.put('/pgspjs/:uid', controller.updatePGSPJS);
errorHandledRoute.get('/pgspjs/:uid', controller.getPGSPJSById);
errorHandledRoute.delete('/pgspjs/:uid', controller.deletePGSPJSById);

export default router;
