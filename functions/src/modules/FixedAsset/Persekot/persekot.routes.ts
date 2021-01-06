import { Router } from 'express';

import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/FixedAsset/Persekot/persekot.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get('/', controller.getAllPersekot);
errorHandledRoute.get('/:uid', controller.getPersekotById);
errorHandledRoute.post('/', controller.createPersekot);
errorHandledRoute.post('/delete', controller.deleteMultiplePersekot);
errorHandledRoute.put('/:uid/approve', controller.approval);
errorHandledRoute.put('/:uid', controller.updatePersekot);
errorHandledRoute.delete('/:uid', controller.deletePersekotById);

export default router;
