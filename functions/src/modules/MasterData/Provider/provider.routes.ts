import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/MasterData/Provider/provider.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const uploadRouter = withMiddleware(protectedRouter, fileParser);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllProvider
);
errorHandledRoute.post(
  '/',
  accessMiddleware('masterData', 'create'),
  controller.createProvider
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateProvider
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getProviderById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteProviderById
);
uploadHandleRouter.post(
  '/excel',
  accessMiddleware('masterData', 'create'),
  controller.importExcel
);

export default router;
