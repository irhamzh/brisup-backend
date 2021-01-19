import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import uploadFile from '@middlewares/uploadFileMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './upload.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const uploadRouter = withMiddleware(
  protectedRouter,
  uploadFile(['.pdf'], 'lampiran', false)
);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('financialAdmin', 'read'),
  controller.getAllUpload
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('financialAdmin', 'read'),
  controller.getUploadById
);
uploadHandleRouter.post(
  '/',
  accessMiddleware('financialAdmin', 'create'),
  controller.createUpload
);
uploadHandleRouter.put(
  '/:uid',
  accessMiddleware('financialAdmin', 'update'),
  controller.updateUpload
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('financialAdmin', 'delete'),
  controller.deleteUploadById
);

export default router;
