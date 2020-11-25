import * as controller from './evaluasi.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllEvaluasiSuplier);
errorHandledRoute.post('/', controller.createEvaluasiSuplier);
errorHandledRoute.put('/:uid', controller.updateEvaluasiSuplier);
errorHandledRoute.get('/:uid', controller.getEvaluasiSuplierById);
errorHandledRoute.delete('/:uid', controller.deleteEvaluasiSuplierById);

export default router;
