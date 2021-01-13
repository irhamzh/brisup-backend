import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/FixedAsset/Persekot/persekot.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
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
errorHandledRoute.post(
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
errorHandledRoute.put(
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
