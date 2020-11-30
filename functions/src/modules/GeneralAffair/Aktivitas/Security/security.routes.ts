import { Router } from 'express';
import { withMiddleware } from 'express-kun';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import fileParser from '@middlewares/fileParserMiddleware';
import * as controller from './security.controller';

const router = Router();
const uploadRouter = withMiddleware(router, fileParser);
const errorHandledRoute = withErrorHandlerRoute(router);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get('/security', controller.getAllSecurity);
uploadHandleRouter.post('/security', controller.createSecurity);
uploadHandleRouter.put('/security/:uid', controller.updateSecurity);
errorHandledRoute.get('/security/:uid', controller.getSecurityById);
errorHandledRoute.delete('/security/:uid', controller.deleteSecurityById);

export default router;
