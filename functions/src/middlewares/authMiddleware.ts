import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { admin } from '@utils/admin';
import TokenError from '@interfaces/TokenError';

type GetTokenFun = (req: Request) => any;
type PreCheckFun = (req: Request, res: Response) => any;

function isFirebaseError(err: any) {
  console.log(err, '2222');
  if (err.code && err?.code?.length > 4) {
    return err.code.startsWith('auth/');
  }
  return false;
}

export default function firebaseAuthMiddleware(
  getToken: GetTokenFun,
  preCheckFun?: PreCheckFun,
  errorHandler?: ErrorRequestHandler
) {
  return async function middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = await getToken(req);
      if (preCheckFun) {
        preCheckFun(req, res);
      }
      const decodedToken = await admin.auth().verifyIdToken(token);
      res.locals.token = token;
      res.locals.decoded = decodedToken;
      next();
    } catch (e) {
      if (errorHandler) {
        errorHandler(e, req, res, next);
        return;
      }
      if (isFirebaseError(e)) {
        res.status(401).json({
          message: e.message,
          error: true,
        });
        return;
      }
      if (e instanceof TokenError) {
        res.status(401).json({
          message: 'Invalid Token',
          error: e.message,
        });
        return;
      }
      res.status(500).json({
        message: 'Internal server Error',
        error: e.message,
        stack: e.stack,
      });
    }
  };
}
