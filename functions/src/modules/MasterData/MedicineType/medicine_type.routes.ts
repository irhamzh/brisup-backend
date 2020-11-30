import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './medicine_type.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllMedicineType);
errorHandledRoute.post('/', controller.createMedicineType);
errorHandledRoute.put('/:uid', controller.updateMedicineType);
errorHandledRoute.get('/:uid', controller.getMedicineTypeById);
errorHandledRoute.delete('/:uid', controller.deleteMedicineTypeById);

export default router;
