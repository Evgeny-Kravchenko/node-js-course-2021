import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError, NotFoundError } from './errors';

export const validationHandling = (
  err: ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.status === StatusCodes.BAD_REQUEST) {
    res.status(err.status).send(err.text);
    return;
  }
  next(err);
};

export const notFoundHandling = (
  err: NotFoundError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.status === StatusCodes.NOT_FOUND) {
    res.status(err.status).send(err.text);
    return;
  }
  next(err);
};
