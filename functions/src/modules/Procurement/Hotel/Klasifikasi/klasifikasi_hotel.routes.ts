import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './klasifikasi_hotel.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllHotelClasification);
errorHandledRoute.post('/', controller.createHotelClasification);
errorHandledRoute.put('/:uid', controller.updateHotelClasification);
errorHandledRoute.get('/:uid', controller.getHotelClasificationById);
errorHandledRoute.delete('/:uid', controller.deleteHotelClasificationById);

export default router;
