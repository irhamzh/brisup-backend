import * as controller from './evaluasi_hotel.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllEvaluasiHotel);
errorHandledRoute.post('/', controller.createEvaluasiHotel);
errorHandledRoute.put('/:uid', controller.updateEvaluasiHotel);
errorHandledRoute.get('/:uid', controller.getEvaluasiHotelById);
errorHandledRoute.delete('/:uid', controller.deleteEvaluasiHotelById);

export default router;
