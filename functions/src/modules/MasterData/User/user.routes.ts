import { Router } from 'express';

import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';
import * as controller from '@modules/MasterData/User/user.controller';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);
const protectedRouter = withAuthMiddleware(errorHandledRoute);

protectedRouter.get('/me', controller.getCurrentAuth);
protectedRouter.get('/me/revoke-token', controller.revokeToken);
protectedRouter.get('/', controller.getAllUser);
protectedRouter.get('/token-data', controller.getTokenData);
errorHandledRoute.post('/', controller.createUser);
errorHandledRoute.post('/login', controller.logIn);
protectedRouter.get('/:uid', controller.getUserById);
protectedRouter.put('/:uid/profilePicture', controller.uploadImage);
protectedRouter.put('/:uid', controller.updateUserById);
protectedRouter.delete('/:uid', controller.deleteUserById);

export default router;
