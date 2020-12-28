import { NextFunction, Response } from 'express';
import { ValidationError } from 'yup';
import InvalidRequestError from '@interfaces/InvalidRequestError';
import NotFoundError from '@interfaces/NotFoundError';
import AccessError from '@interfaces/AccessError';
import ExtensionError from '@interfaces/ExtensionError';
import removeFileTemporary from '@utils/removeFileTemporary';

//improve meneh Bruh!!!
function isFirebaseError(err: any) {
  if (err.code && err?.code?.length > 4) {
    return err.code.startsWith('auth/');
  }
  return false;
}

export default function errorHandlerMiddleware(
  err: any,
  req: any,
  res: Response,
  next: NextFunction
) {
  if (!err) {
    next();
    return;
  }
  removeFileTemporary(req?.files);
  if (isFirebaseError(err)) {
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof InvalidRequestError) {
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }

  if (err instanceof ExtensionError) {
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }

  if (err instanceof AccessError) {
    res.status(401).json({
      message: err.message,
      error: true,
    });
    return;
  }
  res.status(500).json({
    message: 'Internal Server Error',
    debugMessage: err.message,
    stack: err.stack,
    error: true,
  });
}
