import { Router } from 'express';
import { withMiddleware } from 'express-kun';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import fileParser from '@middlewares/fileParserMiddleware';
import * as controller from './courier.controller';

const router = Router();
const uploadRouter = withMiddleware(router, fileParser);
const errorHandledRoute = withErrorHandlerRoute(router);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get('/courier', controller.getAllCourier);
uploadHandleRouter.post('/courier', controller.createCourier);
uploadHandleRouter.put('/courier/:uid', controller.updateCourier);
errorHandledRoute.get('/courier/:uid', controller.getCourierById);
errorHandledRoute.delete('/courier/:uid', controller.deleteCourierById);

export default router;
