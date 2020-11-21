import * as controller from './gedung_ruangan.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllBuildingRoom);
errorHandledRoute.post('/', controller.createBuildingRoom);
errorHandledRoute.put('/:uid', controller.updateBuildingRoom);
errorHandledRoute.get('/:uid', controller.getBuildingRoomById);
errorHandledRoute.delete('/:uid', controller.deleteBuildingRoomById);

export default router;
