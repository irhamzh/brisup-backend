import * as controller from './mechanical_eletrical.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllMechanicalElectrical);
errorHandledRoute.post('/', controller.createMechanicalElectrical);
errorHandledRoute.put('/:uid', controller.updateMechanicalElectrical);
errorHandledRoute.get('/:uid', controller.getMechanicalElectricalById);
errorHandledRoute.delete('/:uid', controller.deleteMechanicalElectricalById);

export default router;
