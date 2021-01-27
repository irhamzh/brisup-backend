import * as controller from './peralatan_it.controller';
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
  controller.getAllPeralatanIT
);
errorHandledRoute.post(
  '/',
  accessMiddleware('fixedAsset', 'create'),
  controller.createPeralatanIT
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updatePeralatanIT
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPeralatanITById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePeralatanITById
);

export default router;
