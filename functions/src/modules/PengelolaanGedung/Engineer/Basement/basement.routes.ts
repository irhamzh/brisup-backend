import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './basement.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/water-meter',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllWaterMeter
);
errorHandledRoute.post(
  '/water-meter',
  accessMiddleware('fixedAsset', 'create'),
  controller.createWaterMeter
);
errorHandledRoute.put(
  '/water-meter/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateWaterMeter
);
errorHandledRoute.get(
  '/water-meter/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getWaterMeterById
);
errorHandledRoute.delete(
  '/water-meter/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteWaterMeterById
);

errorHandledRoute.get(
  '/electrify',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllElectrify
);
errorHandledRoute.post(
  '/electrify',
  accessMiddleware('fixedAsset', 'create'),
  controller.createElectrify
);
errorHandledRoute.put(
  '/electrify/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateElectrify
);
errorHandledRoute.get(
  '/electrify/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getElectrifyById
);
errorHandledRoute.delete(
  '/electrify/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteElectrifyById
);

errorHandledRoute.get(
  '/stp',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllSTP
);
errorHandledRoute.post(
  '/stp',
  accessMiddleware('fixedAsset', 'create'),
  controller.createSTP
);
errorHandledRoute.put(
  '/stp/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateSTP
);
errorHandledRoute.get(
  '/stp/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getSTPById
);
errorHandledRoute.delete(
  '/stp/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteSTPById
);

errorHandledRoute.get(
  '/plumbing',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllPlumbing
);
errorHandledRoute.post(
  '/plumbing',
  accessMiddleware('fixedAsset', 'create'),
  controller.createPlumbing
);
errorHandledRoute.put(
  '/plumbing/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updatePlumbing
);
errorHandledRoute.get(
  '/plumbing/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getPlumbingById
);
errorHandledRoute.delete(
  '/plumbing/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deletePlumbingById
);

errorHandledRoute.get(
  '/ac',
  accessMiddleware('fixedAsset', 'read'),
  controller.getAllAC
);
errorHandledRoute.post(
  '/ac',
  accessMiddleware('fixedAsset', 'create'),
  controller.createAC
);
errorHandledRoute.put(
  '/ac/:uid',
  accessMiddleware('fixedAsset', 'update'),
  controller.updateAC
);
errorHandledRoute.get(
  '/ac/:uid',
  accessMiddleware('fixedAsset', 'read'),
  controller.getACById
);
errorHandledRoute.delete(
  '/ac/:uid',
  accessMiddleware('fixedAsset', 'delete'),
  controller.deleteACById
);
export default router;
