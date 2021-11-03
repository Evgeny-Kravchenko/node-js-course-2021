import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import YAML from 'yamljs';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import {
  validationHandling,
  notFoundHandling,
} from './error-handling/error-handling';
import { reqResLogger } from './middlewares/req-res-logger';

import logger from './common/logger';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(reqResLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.status(200).send('Server is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use(validationHandling);

app.use(notFoundHandling);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    next(err);
  }
);

process.on('uncaughtException', (error: Error) => {
  logger.error(
    `Error name: ${error.name}, error message: ${error.message}, error stack: ${error.stack}`
  );
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error(
    `Error name: ${reason.name}, error message: ${reason.message}, error stack: ${reason.stack}`
  );
});

export default app;
