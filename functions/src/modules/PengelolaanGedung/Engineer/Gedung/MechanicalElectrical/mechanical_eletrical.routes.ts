import * as controller from './mechanical_eletrical.controller';
import { Router } from 'express';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllMechanicalElectrical
);
errorHandledRoute.post(
  '/',
  accessMiddleware('fixedAsset', 'create'),
  controller.createMechanicalElectrical
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateMechanicalElectrical
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getMechanicalElectricalById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteMechanicalElectricalById
);

export default router;
