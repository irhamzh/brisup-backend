import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from '@modules/RoomType/room_type.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllRoomType);
errorHandledRoute.post('/', controller.createRoomType);
errorHandledRoute.put('/:uid', controller.updateRoomType);
errorHandledRoute.get('/:uid', controller.getRoomTypeById);
errorHandledRoute.delete('/:uid', controller.deleteRoomTypeById);

export default router;
