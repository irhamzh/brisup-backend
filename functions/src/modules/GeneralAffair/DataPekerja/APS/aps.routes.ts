import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './aps.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/aps', controller.getAllAPS);
errorHandledRoute.post('/aps', controller.createAPS);
errorHandledRoute.put('/aps/:uid', controller.updateAPS);
errorHandledRoute.get('/aps/:uid', controller.getAPSById);
errorHandledRoute.delete('/aps/:uid', controller.deleteAPSById);

export default router;
