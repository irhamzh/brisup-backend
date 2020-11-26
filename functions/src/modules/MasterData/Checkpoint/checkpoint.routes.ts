import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './checkpoint.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllCheckpoint);
errorHandledRoute.post('/', controller.createCheckpoint);
errorHandledRoute.put('/:uid', controller.updateCheckpoint);
errorHandledRoute.get('/:uid', controller.getCheckpointById);
errorHandledRoute.delete('/:uid', controller.deleteCheckpointById);

export default router;
