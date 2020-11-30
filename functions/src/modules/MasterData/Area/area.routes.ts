import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './area.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllArea);
errorHandledRoute.post('/', controller.createArea);
errorHandledRoute.put('/:uid', controller.updateArea);
errorHandledRoute.get('/:uid', controller.getAreaById);
errorHandledRoute.delete('/:uid', controller.deleteAreaById);

export default router;
