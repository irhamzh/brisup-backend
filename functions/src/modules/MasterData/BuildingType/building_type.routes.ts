import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from '@modules/MasterData/BuildingType/building_type.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllBuildingType);
errorHandledRoute.post('/', controller.createBuildingType);
errorHandledRoute.put('/:uid', controller.updateBuildingType);
errorHandledRoute.get('/:uid', controller.getBuildingTypeById);
errorHandledRoute.delete('/:uid', controller.deleteBuildingTypeById);

export default router;
