import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './internship.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/internship', controller.getAllInternship);
errorHandledRoute.post('/internship', controller.createInternship);
errorHandledRoute.put('/internship/:uid', controller.updateInternship);
errorHandledRoute.get('/internship/:uid', controller.getInternshipById);
errorHandledRoute.delete('/internship/:uid', controller.deleteInternshipById);

export default router;
