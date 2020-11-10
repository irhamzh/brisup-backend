const { ValidationError } = require('yup');
const { NextFunction, Request, Response } = require('express');
const AccessError = require('../interfaces/AccessError');
const NotFoundError = require('../interfaces/NotFoundError');
const ExtensionError = require('../interfaces/ExtensionError');
const InvalidRequestError = require('../interfaces/InvalidRequestError');

exports.errorHandlerMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
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
};
