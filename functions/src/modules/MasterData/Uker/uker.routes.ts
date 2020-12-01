import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './uker.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllUker);
errorHandledRoute.post('/', controller.createUker);
errorHandledRoute.put('/:uid', controller.updateUker);
errorHandledRoute.get('/:uid', controller.getUkerById);
errorHandledRoute.delete('/:uid', controller.deleteUkerById);

export default router;
