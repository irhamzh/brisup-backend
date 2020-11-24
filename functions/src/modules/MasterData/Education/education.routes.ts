import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './education.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllEducation);
errorHandledRoute.post('/', controller.createEducation);
errorHandledRoute.put('/:uid', controller.updateEducation);
errorHandledRoute.get('/:uid', controller.getEducationById);
errorHandledRoute.delete('/:uid', controller.deleteEducationById);

export default router;
