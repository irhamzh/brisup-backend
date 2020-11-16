import * as controller from './jenis_barang.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllJenisBarang);
errorHandledRoute.post('/', controller.createJenisBarang);
errorHandledRoute.put('/:uid', controller.updateJenisBarang);
errorHandledRoute.get('/:uid', controller.getJenisBarangById);
errorHandledRoute.delete('/:uid', controller.deleteJenisBarangById);

export default router;
