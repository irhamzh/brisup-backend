import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './tanda_terima_barang.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllTandaTerimaBarang);
errorHandledRoute.post('/', controller.createTandaTerimaBarang);
errorHandledRoute.put('/:uid', controller.updateTandaTerimaBarang);
errorHandledRoute.get('/:uid', controller.getTandaTerimaBarangById);
errorHandledRoute.delete('/:uid', controller.deleteTandaTerimaBarangById);

export default router;
