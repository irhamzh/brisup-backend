import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './location.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllLocation);
errorHandledRoute.post('/', controller.createLocation);
errorHandledRoute.put('/:uid', controller.updateLocation);
errorHandledRoute.get('/:uid', controller.getLocationById);
errorHandledRoute.delete('/:uid', controller.deleteLocationById);

export default router;
