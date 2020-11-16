import * as controller from '@modules/FixedAsset/Pengadaan/TandaTerimaBarang/tanda_terima_barang.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllTandaTerimaBarang);
errorHandledRoute.post('/', controller.createTandaTerimaBarang);
errorHandledRoute.put('/:uid', controller.updateTandaTerimaBarang);
errorHandledRoute.get('/:uid', controller.getTandaTerimaBarangById);
errorHandledRoute.delete('/:uid', controller.deleteTandaTerimaBarangById);

export default router;
