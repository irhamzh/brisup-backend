import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export default function accessMiddleware(
  division:
    | 'fixedAsset'
    | 'procurement'
    | 'generalAffair'
    | 'financialAdmin'
    | 'masterData',
  permisisonDivision:
    | 'create'
    | 'update'
    | 'delete'
    | 'read'
    | 'dashboard'
    | 'approvalKabag'
    | 'approvalWakabag'
    | 'approvalSupervisor',
  errorHandler?: ErrorRequestHandler
) {
  return async function middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { role } = res.locals.decoded;
    if (!role || !role?.id) {
      res.status(401).json({
        message: '...Unauthorised',
        error: true,
      });
      return;
    }
    if (role[division][permisisonDivision] === true) {
      return next();
    }
    res.status(403).json({
      message:
        'Access denied,You dont have ' +
        permisisonDivision +
        ' ' +
        division +
        ' permission!',
      error: true,
    });
    return;
  };
}
