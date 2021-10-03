const boardsRepo = require('./board.memory.repository');
const BoardModel = require('./board.model');
const taskService = require('../tasks/tasks.service');

const getAll = () => boardsRepo.getAll();

const getById = async (id) => {
  const board = await boardsRepo.getById(id);
  return board ? BoardModel.toResponse(board) : board;
};

const createBoard = async ({ title, columns }) => {
  const board = new BoardModel({ title, columns });
  boardsRepo.createBoard(board);
  return BoardModel.toResponse(board);
};

const updateBoard = (boardId, body) => {
  const newBoard = { ...body, id: boardId };
  boardsRepo.updateBoard(boardId, newBoard);
  return BoardModel.toResponse(newBoard);
};

const deleteBoard = (id) => {
  taskService.deleteTasksByBoardId(id);
  boardsRepo.deleteBoard(id);
  return id;
};

const checkIfBoardExist = (boardId) => boardsRepo.checkIfBoardExist(boardId);

module.exports = {
  getAll,
  getById,
  checkIfBoardExist,
  createBoard,
  updateBoard,
  deleteBoard,
};
