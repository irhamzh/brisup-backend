import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import fileParser from '@middlewares/fileParserMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './employee.controller';

const router = Router();
const uploadRouter = withMiddleware(router, fileParser);
const errorHandledRoute = withErrorHandlerRoute(router);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get('/employee', controller.getAllEmployee);
errorHandledRoute.post('/employee', controller.createEmployee);
errorHandledRoute.put('/employee/:uid', controller.updateEmployee);
errorHandledRoute.get('/employee/:uid', controller.getEmployeeById);
errorHandledRoute.delete('/employee/:uid', controller.deleteEmployeeById);
uploadHandleRouter.post('/employee/excel', controller.importExcel);

export default router;
