import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './compressor.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllCompressor);
errorHandledRoute.post('/', controller.createCompressor);
errorHandledRoute.put('/:uid', controller.updateCompressor);
errorHandledRoute.get('/:uid', controller.getCompressorById);
errorHandledRoute.delete('/:uid', controller.deleteCompressorById);

export default router;
