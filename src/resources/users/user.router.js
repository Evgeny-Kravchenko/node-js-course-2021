const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(200);
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const {
    params: { userId },
  } = req;
  const user = await usersService.getUserById(userId);
  // map user fields to exclude secret fields like "password"
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(404);
    res.json({ message: 'User not found' });
  }
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  if (!body.name || !body.login || !body.password) {
    res.status(400);
    res.json({ message: 'Bad request' });
  }
  try {
    const user = await usersService.createUser(body);
    res.status(201);
    res.json(user);
  } catch (err) {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/:userId').put(async (req, res) => {
  const {
    params: { userId },
    body,
  } = req;
  try {
    await usersService.updateUser(userId, body);
    res.status(200);
    res.json({ message: 'User is updated successfully' });
  } catch (err) {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/:userId').delete(async (req, res) => {
  const {
    params: { userId },
  } = req;
  await usersService.deleteUser(userId);
  res.status(204);
  res.json({ userId });
});

module.exports = router;
