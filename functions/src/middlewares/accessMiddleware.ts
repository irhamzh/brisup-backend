import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

type DivisionType =
  | 'fixedAsset'
  | 'procurement'
  | 'generalAffair'
  | 'financialAdmin'
  | 'masterData';

export default function accessMiddleware(
  division: DivisionType | DivisionType[],
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
        canRefresh: false,
      });
      return;
    }
    if (
      !(division instanceof Array) &&
      role[division][permisisonDivision] === true
    ) {
      return next();
    }
    if (division instanceof Array) {
      let countAccess = 0;
      for (const divisi of division) {
        const checkAccess = role[divisi][permisisonDivision] || 0;
        countAccess = countAccess + checkAccess;
      }
      if (countAccess > 0) {
        return next();
      } else {
        res.status(403).json({
          message: 'Access denied,You dont have permission!',
          error: true,
        });
        return;
      }
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
