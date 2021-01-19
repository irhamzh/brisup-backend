import { Router } from 'express';

import accessMiddleware from '@middlewares/accessMiddleware';
import withAuthMiddleware from '@routers/withAuthMiddleware';
import withErrorHandlerRoute from '@routers/withErrorHandlerRoute';

import * as controller from './internship.controller';

const router = Router();
const protectedRouter = withAuthMiddleware(router);
const errorHandledRoute = withErrorHandlerRoute(protectedRouter);

errorHandledRoute.get(
  '/internship',
  accessMiddleware('generalAffair', 'read'),
  controller.getAllInternship
);
errorHandledRoute.post(
  '/internship',
  accessMiddleware('generalAffair', 'create'),
  controller.createInternship
);
errorHandledRoute.put(
  '/internship/:uid',
  accessMiddleware('generalAffair', 'update'),
  controller.updateInternship
);
errorHandledRoute.get(
  '/internship/:uid',
  accessMiddleware('generalAffair', 'read'),
  controller.getInternshipById
);
errorHandledRoute.delete(
  '/internship/:uid',
  accessMiddleware('generalAffair', 'delete'),
  controller.deleteInternshipById
);

export default router;
