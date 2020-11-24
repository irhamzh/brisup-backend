import * as controller from './evaluasi_catering.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllEvaluasiCatering);
errorHandledRoute.post('/', controller.createEvaluasiCatering);
errorHandledRoute.put('/:uid', controller.updateEvaluasiCatering);
errorHandledRoute.get('/:uid', controller.getEvaluasiCateringById);
errorHandledRoute.delete('/:uid', controller.deleteEvaluasiCateringById);

export default router;
