import express from 'express';
import swaggerUI from 'swagger-ui-express';
import * as path from 'path';
import YAML from 'yamljs';

import { reqResLogger } from './middlewares/req-res-logger';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(reqResLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

export default app;
