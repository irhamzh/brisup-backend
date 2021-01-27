import * as controller from './gedung_ruangan.controller';
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
  controller.getAllBuildingRoom
);
errorHandledRoute.post(
  '/',
  accessMiddleware('fixedAsset', 'create'),
  controller.createBuildingRoom
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateBuildingRoom
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getBuildingRoomById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteBuildingRoomById
);

export default router;
