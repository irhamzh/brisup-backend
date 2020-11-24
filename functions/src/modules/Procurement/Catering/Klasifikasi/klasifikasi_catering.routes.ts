import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './klasifikasi_catering.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllCateringClasification);
errorHandledRoute.post('/', controller.createCateringClasification);
errorHandledRoute.put('/:uid', controller.updateCateringClasification);
errorHandledRoute.get('/:uid', controller.getCateringClasificationById);
errorHandledRoute.delete('/:uid', controller.deleteCateringClasificationById);

export default router;
