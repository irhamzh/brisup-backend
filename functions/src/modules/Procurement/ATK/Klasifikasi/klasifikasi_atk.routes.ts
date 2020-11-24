import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './klasifikasi_atk.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllATKClasification);
errorHandledRoute.post('/', controller.createATKClasification);
errorHandledRoute.put('/:uid', controller.updateATKClasification);
errorHandledRoute.get('/:uid', controller.getATKClasificationById);
errorHandledRoute.delete('/:uid', controller.deleteATKClasificationById);

export default router;
