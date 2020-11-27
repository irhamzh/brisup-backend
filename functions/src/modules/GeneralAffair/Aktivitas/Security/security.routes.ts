import { Router } from 'express';

import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './security.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/security', controller.getAllSecurity);
errorHandledRoute.post('/security', controller.createSecurity);
errorHandledRoute.put('/security/:uid', controller.updateSecurity);
errorHandledRoute.get('/security/:uid', controller.getSecurityById);
errorHandledRoute.delete('/security/:uid', controller.deleteSecurityById);

export default router;
