import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './medicine_type.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);
const protectedRouter = withAuthMiddleware(errorHandledRoute);

protectedRouter.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllMedicineType
);
protectedRouter.post(
  '/',
  accessMiddleware('masterData', 'create'),
  controller.createMedicineType
);
protectedRouter.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateMedicineType
);
protectedRouter.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getMedicineTypeById
);
protectedRouter.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteMedicineTypeById
);

export default router;
