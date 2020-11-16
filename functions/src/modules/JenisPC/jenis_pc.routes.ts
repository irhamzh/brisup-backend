import * as controller from './jenis_pc.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllJenisPc);
errorHandledRoute.post('/', controller.createJenisPc);
errorHandledRoute.put('/:uid', controller.updateJenisPc);
errorHandledRoute.get('/:uid', controller.getJenisPcById);
errorHandledRoute.delete('/:uid', controller.deleteJenisPcById);

export default router;
