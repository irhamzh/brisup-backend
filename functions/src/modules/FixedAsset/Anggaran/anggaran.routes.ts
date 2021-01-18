import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './anggaran.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllAnggaran
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAnggaranById
);
errorHandledRoute.post(
  '/',
  accessMiddleware('fixedAsset', 'create'),
  controller.createAnggaran
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateAnggaran
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteAnggaranById
);

export default router;
