import * as controller from '@modules/FixedAsset/Persekot/persekot.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPersekot);
errorHandledRoute.get('/:uid', controller.getPersekotById);
errorHandledRoute.post('/', controller.createPersekot);
errorHandledRoute.post('/delete', controller.deleteMultiplePersekot);
errorHandledRoute.put('/:uid', controller.updatePersekot);
errorHandledRoute.delete('/:uid', controller.deletePersekotById);

export default router;
