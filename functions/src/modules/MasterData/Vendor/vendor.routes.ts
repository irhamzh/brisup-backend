import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './vendor.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);
const protectedRouter = withAuthMiddleware(errorHandledRoute);

protectedRouter.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllVendor
);
protectedRouter.post(
  '/',
  accessMiddleware('masterData', 'create'),
  controller.createVendor
);
protectedRouter.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateVendor
);
protectedRouter.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getVendorById
);
protectedRouter.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteVendorById
);

export default router;
