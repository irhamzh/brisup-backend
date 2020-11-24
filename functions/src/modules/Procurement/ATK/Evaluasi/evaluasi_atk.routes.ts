import * as controller from './evaluasi_atk.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllEvaluasiATK);
errorHandledRoute.post('/', controller.createEvaluasiATK);
errorHandledRoute.put('/:uid', controller.updateEvaluasiATK);
errorHandledRoute.get('/:uid', controller.getEvaluasiATKById);
errorHandledRoute.delete('/:uid', controller.deleteEvaluasiATKById);

export default router;
