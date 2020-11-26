import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pengadaan_barang_jasa.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPengadaan);
errorHandledRoute.post('/', controller.createPengadaan);
errorHandledRoute.put('/:uid', controller.updatePengadaan);
errorHandledRoute.get('/:uid', controller.getPengadaanById);
errorHandledRoute.delete('/:uid', controller.deletePengadaanById);

export default router;
