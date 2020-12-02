import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import fileParser from '@middlewares/fileParserMiddleware';
import * as controller from '@modules/FixedAsset/Asset/asset.controller';

const router = Router();
const uploadRouter = withMiddleware(router, fileParser);
const errorHandledRoute = withErrorHandlerRoute(router);
const uploadHandleRouter = withErrorHandlerRoute(uploadRouter);

errorHandledRoute.get('/', controller.getAllAsset);
errorHandledRoute.get('/:uid', controller.getAssetById);
errorHandledRoute.post('/', controller.createAsset);
errorHandledRoute.post('/delete', controller.deleteMultipleAsset);
errorHandledRoute.put('/:uid', controller.updateAsset);
errorHandledRoute.delete('/:uid', controller.deleteAssetById);
uploadHandleRouter.post('/import', controller.importExcel);

export default router;
