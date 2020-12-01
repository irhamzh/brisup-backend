import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pgppjs.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/pgppjs', controller.getAllPGPPJS);
errorHandledRoute.post('/pgppjs', controller.createPGPPJS);
errorHandledRoute.put('/pgppjs/:uid', controller.updatePGPPJS);
errorHandledRoute.get('/pgppjs/:uid', controller.getPGPPJSById);
errorHandledRoute.delete('/pgppjs/:uid', controller.deletePGPPJSById);

export default router;
