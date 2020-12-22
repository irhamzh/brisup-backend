import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './formasi_pekerja.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllFormasiPekerja);
errorHandledRoute.post('/', controller.createFormasiPekerja);
// errorHandledRoute.put('/:uid', controller.updateFormasiPekerja);
errorHandledRoute.get('/:uid', controller.getFormasiPekerjaById);
errorHandledRoute.delete('/:uid', controller.deleteFormasiPekerjaById);

export default router;
