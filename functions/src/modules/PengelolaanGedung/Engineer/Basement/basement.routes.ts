import { Router } from 'express';

import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './basement.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/water-meter', controller.getAllWaterMeter);
errorHandledRoute.post('/water-meter', controller.createWaterMeter);
errorHandledRoute.put('/water-meter/:uid', controller.updateWaterMeter);
errorHandledRoute.get('/water-meter/:uid', controller.getWaterMeterById);
errorHandledRoute.delete('/water-meter/:uid', controller.deleteWaterMeterById);

errorHandledRoute.get('/electrify', controller.getAllElectrify);
errorHandledRoute.post('/electrify', controller.createElectrify);
errorHandledRoute.put('/electrify/:uid', controller.updateElectrify);
errorHandledRoute.get('/electrify/:uid', controller.getElectrifyById);
errorHandledRoute.delete('/electrify/:uid', controller.deleteElectrifyById);

errorHandledRoute.get('/stp', controller.getAllSTP);
errorHandledRoute.post('/stp', controller.createSTP);
errorHandledRoute.put('/stp/:uid', controller.updateSTP);
errorHandledRoute.get('/stp/:uid', controller.getSTPById);
errorHandledRoute.delete('/stp/:uid', controller.deleteSTPById);

errorHandledRoute.get('/plumbing', controller.getAllPlumbing);
errorHandledRoute.post('/plumbing', controller.createPlumbing);
errorHandledRoute.put('/plumbing/:uid', controller.updatePlumbing);
errorHandledRoute.get('/plumbing/:uid', controller.getPlumbingById);
errorHandledRoute.delete('/plumbing/:uid', controller.deletePlumbingById);

errorHandledRoute.get('/ac', controller.getAllAC);
errorHandledRoute.post('/ac', controller.createAC);
errorHandledRoute.put('/ac/:uid', controller.updateAC);
errorHandledRoute.get('/ac/:uid', controller.getACById);
errorHandledRoute.delete('/ac/:uid', controller.deleteACById);
export default router;
