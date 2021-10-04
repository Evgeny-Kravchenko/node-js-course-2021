const router = require('express').Router();
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(StatusCodes.OK);
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (userId) {
    const user = await usersService.getUserById(userId);
    if (user) {
      res.status(StatusCodes.OK);
      res.json(User.toResponse(user));
    } else {
      res.status(StatusCodes.NOT_FOUND);
      res.json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  if (!body.name || !body.login || !body.password) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
  try {
    const user = await usersService.createUser(body);
    res.status(StatusCodes.CREATED);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

router.route('/:userId').put(async (req, res) => {
  const {
    params: { userId },
    body,
  } = req;
  if (userId && body.name && body.login && body.password) {
    try {
      const user = await usersService.updateUser(userId, body);
      res.status(StatusCodes.OK);
      res.json(user);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.route('/:userId').delete(async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (userId) {
    await usersService.deleteUser(userId);
    res.status(StatusCodes.NO_CONTENT);
    res.json({ userId });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

module.exports = router;
