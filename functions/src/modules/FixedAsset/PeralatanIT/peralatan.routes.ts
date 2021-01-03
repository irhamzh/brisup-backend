import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

import * as controller from './peralatan.controller';

errorHandledRoute.get(
  '/',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPeralatan
);
errorHandledRoute.post(
  '/',
  accessMiddleware('fixedAsset', 'create'),
  controller.createPeralatan
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updatePeralatan
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPeralatanById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePeralatanById
);

uploadHandleRouter.post(
  '/excel',
  accessMiddleware('fixedAsset', 'create'),
  controller.importExcel
);
export default router;
