import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import fileParser from '@middlewares/fileParserMiddleware';

import * as controller from './eksploitasi.controller';

const router = Router();
const uploadRouter = withMiddleware(router, fileParser);
const errorHandledRoute = withErrorHandlerRoute(router);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get('/', controller.getAllEkploitasiAnggaran);
errorHandledRoute.get('/:uid', controller.getEkploitasiAnggaranById);
// errorHandledRoute.post('/', controller.createAsset);
// errorHandledRoute.post('/delete', controller.deleteMultipleAsset);
// errorHandledRoute.put('/:uid', controller.updateAsset);
// errorHandledRoute.delete('/:uid', controller.deleteAssetById);
uploadHandleRouter.post('/excel', controller.importExcel);

export default router;
