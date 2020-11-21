import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pump.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPump);
errorHandledRoute.post('/', controller.createPump);
errorHandledRoute.put('/:uid', controller.updatePump);
errorHandledRoute.get('/:uid', controller.getPumpById);
errorHandledRoute.delete('/:uid', controller.deletePumpById);

export default router;
