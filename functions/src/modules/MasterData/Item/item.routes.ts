import { Router } from 'express';
import * as controller from './item.controller';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllItem);
errorHandledRoute.post('/', controller.createItem);
errorHandledRoute.put('/:uid', controller.updateItem);
errorHandledRoute.get('/:uid', controller.getItemById);
errorHandledRoute.delete('/:uid', controller.deleteItemById);

export default router;
