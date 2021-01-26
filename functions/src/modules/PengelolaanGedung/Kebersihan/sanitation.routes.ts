import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './sanitation.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

//yard
errorHandledRoute.get(
  '/yard',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllYardSanitation
);
errorHandledRoute.post(
  '/yard',
  accessMiddleware('fixedAsset', 'create'),
  controller.createYardSanitation
);
errorHandledRoute.put(
  '/yard/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateYardSanitation
);
errorHandledRoute.get(
  '/yard/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getYardSanitationById
);
errorHandledRoute.delete(
  '/yard/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteYardSanitationById
);

// /smart-building
errorHandledRoute.get(
  '/smart-building',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllSmartBuildingSanitation
);
errorHandledRoute.post(
  '/smart-building',
  accessMiddleware('fixedAsset', 'create'),
  controller.createSmartBuildingSanitation
);
errorHandledRoute.put(
  '/smart-building/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateSmartBuildingSanitation
);
errorHandledRoute.get(
  '/smart-building/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getSmartBuildingSanitationById
);
errorHandledRoute.delete(
  '/smart-building/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteSmartBuildingSanitationById
);

// //mushola
// errorHandledRoute.get(
//   '/sarana-pendukung/mushola',
//   controller.getAllMusholaSanitation
// );
// errorHandledRoute.post(
//   '/sarana-pendukung/mushola',
//   controller.createMusholaSanitation
// );
// errorHandledRoute.put(
//   '/sarana-pendukung/mushola/:uid',
//   controller.updateMusholaSanitation
// );
// errorHandledRoute.get(
//   '/sarana-pendukung/mushola/:uid',
//   controller.getMusholaSanitationById
// );
// errorHandledRoute.delete(
//   '/sarana-pendukung/mushola/:uid',
//   controller.deleteMusholaSanitationById
// );

errorHandledRoute.get(
  '/sarana-pendukung',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllSaranaPendukungSanitation
);
errorHandledRoute.post(
  '/sarana-pendukung',
  accessMiddleware('fixedAsset', 'create'),
  controller.createSaranaPendukungSanitation
);
errorHandledRoute.put(
  '/sarana-pendukung/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateSaranaPendukungSanitation
);
errorHandledRoute.get(
  '/sarana-pendukung/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getSaranaPendukungSanitationById
);
errorHandledRoute.delete(
  '/sarana-pendukung/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteSaranaPendukungSanitationById
);

//yard
errorHandledRoute.get(
  '/innovation-building',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllInnovationBuildingSanitation
);
errorHandledRoute.post(
  '/innovation-building',
  accessMiddleware('fixedAsset', 'create'),
  controller.createInnovationBuildingSanitation
);
errorHandledRoute.put(
  '/innovation-building/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateInnovationBuildingSanitation
);
errorHandledRoute.get(
  '/innovation-building/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getInnovationBuildingSanitationById
);
errorHandledRoute.delete(
  '/innovation-building/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteInnovationBuildingSanitationById
);

export default router;
