import { Router } from 'express';

import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './sanitation.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

//yard
errorHandledRoute.get('/yard', controller.getAllYardSanitation);
errorHandledRoute.post('/yard', controller.createYardSanitation);
errorHandledRoute.put('/yard/:uid', controller.updateYardSanitation);
errorHandledRoute.get('/yard/:uid', controller.getYardSanitationById);
errorHandledRoute.delete('/yard/:uid', controller.deleteYardSanitationById);

// /smart-building
errorHandledRoute.get(
  '/smart-building',
  controller.getAllSmartBuildingSanitation
);
errorHandledRoute.post(
  '/smart-building',
  controller.createSmartBuildingSanitation
);
errorHandledRoute.put(
  '/smart-building/:uid',
  controller.updateSmartBuildingSanitation
);
errorHandledRoute.get(
  '/smart-building/:uid',
  controller.getSmartBuildingSanitationById
);
errorHandledRoute.delete(
  '/smart-building/:uid',
  controller.deleteSmartBuildingSanitationById
);

//mushola
errorHandledRoute.get(
  '/sarana-pendukung/mushola',
  controller.getAllMusholaSanitation
);
errorHandledRoute.post(
  '/sarana-pendukung/mushola',
  controller.createMusholaSanitation
);
errorHandledRoute.put(
  '/sarana-pendukung/mushola/:uid',
  controller.updateMusholaSanitation
);
errorHandledRoute.get(
  '/sarana-pendukung/mushola/:uid',
  controller.getMusholaSanitationById
);
errorHandledRoute.delete(
  '/sarana-pendukung/mushola/:uid',
  controller.deleteMusholaSanitationById
);

errorHandledRoute.get(
  '/sarana-pendukung/pos-security',
  controller.getAllSecurityPosSanitation
);
errorHandledRoute.post(
  '/sarana-pendukung/pos-security',
  controller.createSecurityPosSanitation
);
errorHandledRoute.put(
  '/sarana-pendukung/pos-security/:uid',
  controller.updateSecurityPosSanitation
);
errorHandledRoute.get(
  '/sarana-pendukung/pos-security/:uid',
  controller.getSecurityPosSanitationById
);
errorHandledRoute.delete(
  '/sarana-pendukung/pos-security/:uid',
  controller.deleteSecurityPosSanitationById
);

export default router;
