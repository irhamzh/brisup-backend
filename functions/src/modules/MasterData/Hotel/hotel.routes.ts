import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './hotel.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllHotel);
errorHandledRoute.post('/', controller.createHotel);
errorHandledRoute.put('/:uid', controller.updateHotel);
errorHandledRoute.get('/:uid', controller.getHotelById);
errorHandledRoute.delete('/:uid', controller.deleteHotelById);

export default router;
