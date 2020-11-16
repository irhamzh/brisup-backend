import * as controller from './persediaan.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPersediaan);
errorHandledRoute.post('/', controller.createPersediaan);
errorHandledRoute.put('/:uid', controller.updatePersediaan);
errorHandledRoute.get('/:uid', controller.getPersediaanById);
errorHandledRoute.delete('/:uid', controller.deletePersediaanById);

export default router;
