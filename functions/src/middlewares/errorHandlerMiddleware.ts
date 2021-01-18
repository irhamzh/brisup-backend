import { ValidationError } from 'yup';
import { NextFunction, Response } from 'express';
import { errors } from '@elastic/elasticsearch';

import AccessError from '@interfaces/AccessError';
import NotFoundError from '@interfaces/NotFoundError';
import ExtensionError from '@interfaces/ExtensionError';
import removeFileTemporary from '@utils/removeFileTemporary';
import InvalidRequestError from '@interfaces/InvalidRequestError';

//improve meneh Bruh!!!
function isFirebaseError(err: any) {
  if (err.code && err?.code?.length > 4) {
    return err.code.startsWith('auth/');
  }
  return false;
}

export default function errorHandlerMiddleware(
  err: Error,
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
  if (err instanceof errors.ResponseError) {
    console.log('Elastic Search ResponseError');
    let message = err.message,
      statusCode = 400;
    if (err.statusCode === 404) {
      message = 'Data not found';
      statusCode = err.statusCode;
    } else if (err.statusCode === 400) {
      message = 'Bad Request';
      statusCode = err.statusCode;
    }
    res.status(statusCode).json({
      message: message,
      error: true,
    });
    return;
  }
  if (err instanceof errors.ConfigurationError) {
    console.log('Elastic Search ConfigurationError');
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof errors.ConnectionError) {
    console.log('Elastic Search ConnectionError');
    res.status(503).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof errors.DeserializationError) {
    console.log('Elastic Search DeserializationError');
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof errors.NoLivingConnectionsError) {
    console.log('Elastic Search NoLivingConnectionsError');
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof errors.RequestAbortedError) {
    console.log('Elastic Search RequestAbortedError');
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof errors.SerializationError) {
    console.log('Elastic Search SerializationError');
    res.status(400).json({
      message: err.message,
      error: true,
    });
    return;
  }
  if (err instanceof errors.TimeoutError) {
    console.log('Elastic Search TimeoutError');
    res.status(408).json({
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
