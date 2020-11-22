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
  controller.getAllSaranaPendukungSanitation
);
errorHandledRoute.post(
  '/sarana-pendukung',
  controller.createSaranaPendukungSanitation
);
errorHandledRoute.put(
  '/sarana-pendukung/:uid',
  controller.updateSaranaPendukungSanitation
);
errorHandledRoute.get(
  '/sarana-pendukung/:uid',
  controller.getSaranaPendukungSanitationById
);
errorHandledRoute.delete(
  '/sarana-pendukung/:uid',
  controller.deleteSaranaPendukungSanitationById
);

//yard
errorHandledRoute.get(
  '/innovation-building',
  controller.getAllInnovationBuildingSanitation
);
errorHandledRoute.post(
  '/innovation-building',
  controller.createInnovationBuildingSanitation
);
errorHandledRoute.put(
  '/innovation-building/:uid',
  controller.updateInnovationBuildingSanitation
);
errorHandledRoute.get(
  '/innovation-building/:uid',
  controller.getInnovationBuildingSanitationById
);
errorHandledRoute.delete(
  '/innovation-building/:uid',
  controller.deleteInnovationBuildingSanitationById
);

export default router;
