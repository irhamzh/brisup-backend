import { Router } from 'express';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pengadaan_barang_jasa.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get('/', controller.getAllPengadaan);
errorHandledRoute.get('/full', controller.getAllPengadaanFull);
errorHandledRoute.get('/dashboard', controller.dashboard);
errorHandledRoute.post('/', controller.createPengadaan);
errorHandledRoute.put('/:uid/approve-process', controller.approveProcess);
errorHandledRoute.put('/:uid/approve-wabag', controller.approveWabag);
errorHandledRoute.put('/:uid/approve-kabag', controller.approveKabag);
errorHandledRoute.put('/:uid/finsih', controller.approveFinish);
errorHandledRoute.put('/:uid', controller.updatePengadaan);
errorHandledRoute.get('/:uid', controller.getPengadaanById);
errorHandledRoute.delete('/:uid', controller.deletePengadaanById);

export default router;
