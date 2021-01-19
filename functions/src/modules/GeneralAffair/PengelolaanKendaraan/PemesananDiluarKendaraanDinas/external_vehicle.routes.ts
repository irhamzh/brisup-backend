import { Router } from 'express';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './external_vehicle.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllExternalVehicle
);
errorHandledRoute.post(
  '/',
  accessMiddleware('generalAffair', 'create'),
  controller.createExternalVehicle
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateExternalVehicle
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getExternalVehicleById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteExternalVehicleById
);

export default router;
