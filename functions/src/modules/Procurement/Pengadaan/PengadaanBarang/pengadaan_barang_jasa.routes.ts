import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './pengadaan_barang_jasa.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware('procurement', 'read'),
  controller.getAllPengadaan
);
errorHandledRoute.get(
  '/full',
  accessMiddleware('procurement', 'read'),
  controller.getAllPengadaanFull
);
errorHandledRoute.get(
  '/dashboard',
  accessMiddleware('procurement', 'dashboard'),
  controller.dashboard
);
errorHandledRoute.post(
  '/',
  accessMiddleware('procurement', 'create'),
  controller.createPengadaan
);
errorHandledRoute.put(
  '/:uid/approve-process',
  accessMiddleware('procurement', 'create'),
  controller.approveProcess
);
errorHandledRoute.put(
  '/:uid/approve-supervisor',
  accessMiddleware('procurement', 'approvalSupervisor'),
  controller.approveSupervisor
);
errorHandledRoute.put(
  '/:uid/approve-wabag',
  accessMiddleware('procurement', 'approvalWakabag'),
  controller.approveWabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag',
  accessMiddleware('procurement', 'approvalKabag'),
  controller.approveKabag
);
errorHandledRoute.put(
  '/:uid/approve-kabag-wakabag',
  controller.approveKabagWakabag
);
errorHandledRoute.put(
  '/:uid/finish',
  accessMiddleware('procurement', 'create'),
  controller.approveFinish
);
errorHandledRoute.put(
  '/:uid',
  accessMiddleware('procurement', 'update'),
  controller.updatePengadaan
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware('procurement', 'read'),
  controller.getPengadaanById
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware('procurement', 'delete'),
  controller.deletePengadaanById
);

export default router;
