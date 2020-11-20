import * as controller from './peralatan_kerja.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPeralatanKerja);
errorHandledRoute.post('/', controller.createPeralatanKerja);
errorHandledRoute.put('/:uid', controller.updatePeralatanKerja);
errorHandledRoute.get('/:uid', controller.getPeralatanKerjaById);
errorHandledRoute.delete('/:uid', controller.deletePeralatanKerjaById);

export default router;
