import * as controller from '@modules/MasterData/Ruangan/ruangan.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllRuangan);
errorHandledRoute.post('/', controller.createRuangan);
errorHandledRoute.put('/:uid', controller.updateRuangan);
errorHandledRoute.get('/:uid', controller.getRuanganById);
errorHandledRoute.delete('/:uid', controller.deleteRuanganById);

export default router;
