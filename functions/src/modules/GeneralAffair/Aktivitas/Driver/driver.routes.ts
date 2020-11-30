import { Router } from 'express';
import { withMiddleware } from 'express-kun';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import fileParser from '@middlewares/fileParserMiddleware';
import * as controller from './driver.controller';

const router = Router();
const uploadRouter = withMiddleware(router, fileParser);
const errorHandledRoute = withErrorHandlerRoute(router);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get('/driver', controller.getAllDriver);
uploadHandleRouter.post('/driver', controller.createDriver);
uploadHandleRouter.put('/driver/:uid', controller.updateDriver);
errorHandledRoute.get('/driver/:uid', controller.getDriverById);
errorHandledRoute.delete('/driver/:uid', controller.deleteDriverById);

export default router;
