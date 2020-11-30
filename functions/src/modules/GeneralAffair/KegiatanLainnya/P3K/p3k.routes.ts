import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './p3k.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/first-aid-kit', controller.getAllP3k);
errorHandledRoute.post('/first-aid-kit', controller.createP3k);
errorHandledRoute.put('/first-aid-kit/:uid', controller.updateP3k);
errorHandledRoute.get('/first-aid-kit/:uid', controller.getP3kById);
errorHandledRoute.delete('/first-aid-kit/:uid', controller.deleteP3kById);

export default router;
