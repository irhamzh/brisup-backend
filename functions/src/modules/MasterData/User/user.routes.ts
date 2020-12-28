import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from '@modules/MasterData/User/user.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);
const protectedRouter = withAuthMiddleware(errorHandledRoute);

protectedRouter.get(
  '/me',
  accessMiddleware('masterData', 'read'),
  controller.getCurrentAuth
);
protectedRouter.get(
  '/me/revoke-token',
  accessMiddleware('masterData', 'read'),
  controller.revokeToken
);
protectedRouter.get(
  '/',
  accessMiddleware('masterData', 'read'),
  controller.getAllUser
);
protectedRouter.get(
  '/token-data',
  accessMiddleware('masterData', 'read'),
  controller.getTokenData
);
errorHandledRoute.post('/', controller.createUser);
errorHandledRoute.post('/login', controller.logIn);
protectedRouter.get(
  '/:uid',
  accessMiddleware('masterData', 'read'),
  controller.getUserById
);
protectedRouter.put('/:uid/profilePicture', controller.uploadImage);
protectedRouter.put(
  '/:uid',
  accessMiddleware('masterData', 'update'),
  controller.updateUserById
);
protectedRouter.delete(
  '/:uid',
  accessMiddleware('masterData', 'delete'),
  controller.deleteUserById
);

export default router;
