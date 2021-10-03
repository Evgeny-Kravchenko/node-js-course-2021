const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./boards.service');
const taskRouter = require('../tasks/task.router');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200);
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const {
    params: { boardId },
  } = req;
  const board = await boardsService.getById(boardId);
  if (board) {
    res.status(200);
    res.json(board);
  } else {
    res.status(404);
    res.json({ message: 'Board not found' });
  }
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  if (!body.title || !body.columns) {
    res.status(400);
    res.json({ message: 'Bad request' });
  }
  try {
    const board = await boardsService.createBoard(body);
    res.status(201);
    res.json(board);
  } catch (err) {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/:boardId').put(async (req, res) => {
  const {
    params: { boardId },
    body,
  } = req;
  try {
    await boardsService.updateBoard(boardId, body);
    res.status(200);
    res.json({ message: 'Board is updated successfully' });
  } catch (err) {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const {
    params: { boardId },
  } = req;
  await boardsService.deleteBoard(boardId);
  res.status(204);
  res.json({ boardId });
});

router.use('/:boardId/tasks', taskRouter);

module.exports = router;
