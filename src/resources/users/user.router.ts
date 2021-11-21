import { Router } from 'express';

import { StatusCodes } from 'http-status-codes';

import { ValidationError, NotFoundError } from '../../error-handling/errors';

import User from '../../entities/User';
import * as usersService from './user.service';

const router = Router();

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(StatusCodes.OK);
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    if (!userId) {
      throw new ValidationError();
    }
    const user = await usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.OK);
    res.json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.name || !body.login || !body.password) {
      throw new ValidationError();
    }

    const user = await usersService.createUser(body);
    res.status(StatusCodes.CREATED);
    res.json(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.route('/:userId').put(async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;
  try {
    if (!userId || !body.name || !body.login || !body.password) {
      throw new ValidationError();
    }

    const user = await usersService.updateUser(userId, body);
    if (!user) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.OK);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.route('/:userId').delete(async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    if (!userId) {
      throw new ValidationError();
    }

    const isDeleted = await usersService.deleteUser(userId);
    if (!isDeleted) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.NO_CONTENT);
    res.json({ userId });
  } catch (err) {
    next(err);
  }
});

export default router;
