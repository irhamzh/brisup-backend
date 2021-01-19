import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import uploadFile from '@middlewares/uploadFileMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './cash.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const uploadRouter = withMiddleware(
  protectedRouter,
  uploadFile(['.png', '.PNG', '.JPG', '.jpg'], 'lampiran', true)
);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('financialAdmin', 'read'),
  controller.getAllCash
);
uploadHandleRouter.post(
  '/',
  accessMiddleware('financialAdmin', 'create'),
  controller.createCash
);
uploadHandleRouter.put(
  '/:uid',
  accessMiddleware('financialAdmin', 'update'),
  controller.updateCash
);
errorHandledRoute.get(
  ':uid',
  accessMiddleware('financialAdmin', 'read'),
  controller.getCashById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('financialAdmin', 'delete'),
  controller.deleteCashById
);

export default router;
