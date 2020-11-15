import * as controller from '@modules/User/user.controller';
import { Router } from 'express';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

const router = Router();
const errorHandledRoute = withErrorHandlerRoute(router);

// errorHandledRoute.get('/me', controller.getUserMe);
errorHandledRoute.get('/', controller.getAllUser);
errorHandledRoute.post('/', controller.createUser);
errorHandledRoute.post('/login', controller.logIn);
errorHandledRoute.get('/:uid', controller.getUserById);
errorHandledRoute.put('/:uid/profilePicture', controller.uploadImage);
errorHandledRoute.put('/:uid', controller.updateUserById);
errorHandledRoute.delete('/:uid', controller.deleteUserById);

export default router;
