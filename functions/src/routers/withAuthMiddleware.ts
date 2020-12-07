import { Router } from 'express';
import { withMiddleware } from 'express-kun';

import authMiddleware from '@middlewares/authMiddleware';
import getTokenFromBearer from '@utils/getTokenFromBearer';

export default function withAuthMiddleware(router: Router) {
  return withMiddleware(router, authMiddleware(getTokenFromBearer));
}
