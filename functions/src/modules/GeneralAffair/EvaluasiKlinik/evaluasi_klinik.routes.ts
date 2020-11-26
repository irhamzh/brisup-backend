import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './evaluasi_klinik.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllClinikEvalution);
errorHandledRoute.post('/', controller.createClinikEvalution);
errorHandledRoute.put('/:uid', controller.updateClinikEvalution);
errorHandledRoute.get('/:uid', controller.getClinikEvalutionById);
errorHandledRoute.delete('/:uid', controller.deleteClinikEvalutionById);

export default router;
