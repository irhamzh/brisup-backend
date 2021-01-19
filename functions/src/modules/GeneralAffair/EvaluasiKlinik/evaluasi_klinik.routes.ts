import { Router } from 'express';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './evaluasi_klinik.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllClinikEvalution
);
errorHandledRoute.post(
  '/',
  accessMiddleware('generalAffair', 'create'),
  controller.createClinikEvalution
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateClinikEvalution
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getClinikEvalutionById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteClinikEvalutionById
);

export default router;
