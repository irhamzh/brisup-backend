import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './formasi_pekerja.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllFormasiPekerja
);
errorHandledRoute.post(
  '/',
  accessMiddleware('generalAffair', 'create'),
  controller.createFormasiPekerja
);
// errorHandledRoute.put(
//   '/:uid',
//   accessMiddleware('generalAffair', 'update'),
//   controller.updateFormasiPekerja
// );
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getFormasiPekerjaById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteFormasiPekerjaById
);

export default router;
