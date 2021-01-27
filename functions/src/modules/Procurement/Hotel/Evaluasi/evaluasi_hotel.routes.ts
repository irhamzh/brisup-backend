import * as controller from './evaluasi_hotel.controller';
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
  controller.getAllEvaluasiHotel
);
errorHandledRoute.post(
  '/',
  accessMiddleware('procurement', 'create'),
  controller.createEvaluasiHotel
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('procurement', 'update'),
  controller.updateEvaluasiHotel
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('procurement', 'read'),
  controller.getEvaluasiHotelById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('procurement', 'delete'),
  controller.deleteEvaluasiHotelById
);

export default router;
