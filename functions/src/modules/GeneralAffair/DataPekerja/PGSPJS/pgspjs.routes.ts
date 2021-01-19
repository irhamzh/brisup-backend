import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pgspjs.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/pgspjs',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllPGSPJS
);
errorHandledRoute.post(
  '/pgspjs',
  accessMiddleware('generalAffair', 'create'),
  controller.createPGSPJS
);
errorHandledRoute.put(
  '/pgspjs/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updatePGSPJS
);
errorHandledRoute.get(
  '/pgspjs/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getPGSPJSById
);
errorHandledRoute.delete(
  '/pgspjs/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deletePGSPJSById
);

export default router;
