import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/FixedAsset/Asset/asset.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllAsset
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAssetById
);
errorHandledRoute.post(
  '/',
  accessMiddleware('fixedAsset', 'create'),
  controller.createAsset
);
errorHandledRoute.post(
  '/delete',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteMultipleAsset
);
errorHandledRoute.post(
  '/penihilan',
  accessMiddleware('fixedAsset', 'approvalSupervisor'),
  controller.pengajuanPenihilan
);
errorHandledRoute.put('/:uid/approve', controller.approval);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateAsset
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteAssetById
);
uploadHandleRouter.post(
  '/excel',
  accessMiddleware('fixedAsset', 'create'),
  controller.importExcel
);

export default router;
