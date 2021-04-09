import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import uploadFile from '@middlewares/uploadFileMiddleware';
import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/FixedAsset/Persekot/persekot.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const uploadRouter = withMiddleware(
  protectedRouter,
  uploadFile(['.png', '.PNG', '.JPG', '.jpg', '.pdf'], 'lampiran', true)
);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'read'
  ),
  controller.getAllPersekot
);
errorHandledRoute.get(
  '/:uid',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'read'
  ),
  controller.getPersekotById
);
uploadHandleRouter.post(
  '/',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'create'
  ),
  controller.createPersekot
);
errorHandledRoute.post(
  '/delete',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'delete'
  ),
  controller.deleteMultiplePersekot
);
errorHandledRoute.post(
  '/penihilan',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'create'
  ),
  controller.pengajuanPenihilan
);
errorHandledRoute.put('/:uid/approve', controller.approval);
errorHandledRoute.put('/:uid/deny', controller.denyPenihilan);
uploadHandleRouter.put(
  '/:uid',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'update'
  ),
  controller.updatePersekot
);
errorHandledRoute.delete(
  '/:uid',
  accessMiddleware(
    ['fixedAsset', 'procurement', 'generalAffair', 'financialAdmin'],
    'delete'
  ),
  controller.deletePersekotById
);

export default router;
