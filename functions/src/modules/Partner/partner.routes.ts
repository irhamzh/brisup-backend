import * as controller from '@modules/Partner/partner.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

errorHandledRoute.get('/', controller.getAllPartner);
errorHandledRoute.post('/', controller.createPartner);
errorHandledRoute.put('/:uid', controller.updatePartner);
errorHandledRoute.get('/:uid', controller.getPartnerById);
errorHandledRoute.delete('/:uid', controller.deletePartnerById);

export default router;
