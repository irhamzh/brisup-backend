import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './building.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllBuilding);
errorHandledRoute.post('/', controller.createBuilding);
errorHandledRoute.put('/:uid', controller.updateBuilding);
errorHandledRoute.get('/:uid', controller.getBuildingById);
errorHandledRoute.delete('/:uid', controller.deleteBuildingById);

export default router;
