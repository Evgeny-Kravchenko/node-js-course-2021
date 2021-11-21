import { Request, Response, NextFunction } from 'express';
import logger from '../common/logger';

export const reqResLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.on('finish', () => {
    logger.info(
      `method: ${req.method}; url: ${JSON.stringify(
        req.originalUrl
      )}; query parameters: ${JSON.stringify(
        req.params
      )}; params: ${JSON.stringify(req.params)}; body: ${JSON.stringify(
        req.body
      )}; response status: ${res.statusCode}`
    );
  });
  next();
};
