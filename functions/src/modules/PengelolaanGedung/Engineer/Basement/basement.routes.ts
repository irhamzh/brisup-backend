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
errorHandledRoute.post('/electrify', controller.createSTP);
errorHandledRoute.put('/electrify/:uid', controller.updateSTP);
errorHandledRoute.get('/electrify/:uid', controller.getSTPById);
errorHandledRoute.delete('/electrify/:uid', controller.deleteSTPById);

errorHandledRoute.get('/plumbing', controller.getAllPlumbing);
errorHandledRoute.post('/electrify', controller.createPlumbing);
errorHandledRoute.put('/electrify/:uid', controller.updatePlumbing);
errorHandledRoute.get('/electrify/:uid', controller.getPlumbingById);
errorHandledRoute.delete('/electrify/:uid', controller.deletePlumbingById);

errorHandledRoute.get('/ac', controller.getAllAC);
errorHandledRoute.post('/electrify', controller.createAC);
errorHandledRoute.put('/electrify/:uid', controller.updateAC);
errorHandledRoute.get('/electrify/:uid', controller.getACById);
errorHandledRoute.delete('/electrify/:uid', controller.deleteACById);
export default router;
