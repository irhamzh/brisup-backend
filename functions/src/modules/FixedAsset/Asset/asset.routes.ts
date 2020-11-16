import * as controller from '@modules/FixedAsset/Asset/asset.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllAsset);
errorHandledRoute.get('/:uid', controller.getAssetById);
errorHandledRoute.post('/', controller.createAsset);
errorHandledRoute.post('/delete', controller.deleteMultipleAsset);
errorHandledRoute.put('/:uid', controller.updateAsset);
errorHandledRoute.delete('/:uid', controller.deleteAssetById);

export default router;
