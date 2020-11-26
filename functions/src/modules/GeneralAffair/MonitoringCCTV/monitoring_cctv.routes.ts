import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './monitoring_cctv.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllMonitoringCCTV);
errorHandledRoute.post('/', controller.createMonitoringCCTV);
errorHandledRoute.put('/:uid', controller.updateMonitoringCCTV);
errorHandledRoute.get('/:uid', controller.getMonitoringCCTVById);
errorHandledRoute.delete('/:uid', controller.deleteMonitoringCCTVById);

export default router;
