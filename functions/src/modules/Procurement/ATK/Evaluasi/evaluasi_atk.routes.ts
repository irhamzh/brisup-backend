import * as controller from './evaluasi_atk.controller';
import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('procurement', 'read'),
  controller.getAllEvaluasiATK
);
errorHandledRoute.post(
  '/',
  accessMiddleware('procurement', 'create'),
  controller.createEvaluasiATK
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('procurement', 'update'),
  controller.updateEvaluasiATK
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('procurement', 'read'),
  controller.getEvaluasiATKById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('procurement', 'delete'),
  controller.deleteEvaluasiATKById
);

export default router;
