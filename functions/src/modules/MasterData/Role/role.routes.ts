import { Router } from 'express';

import * as controller from '@modules/MasterData/Role/role.controller';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);
const protectedRouter = withAuthMiddleware(errorHandledRoute);

protectedRouter.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllRole
);
protectedRouter.post(
  '/',
  accessMiddleware('masterData', 'create'),
  controller.createRole
);
protectedRouter.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateRole
);
protectedRouter.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getRoleById
);
protectedRouter.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteRoleById
);

export default router;
