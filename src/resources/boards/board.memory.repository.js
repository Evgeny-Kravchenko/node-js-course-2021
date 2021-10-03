const { dataBaseService } = require('../../services');

const getAll = async () =>
  // TODO: mock implementation. should be replaced during task development
  dataBaseService.getResource('boards');

const getById = async (id) => {
  const doesResourceExist = dataBaseService.checkIfResourceExist(
    `${__dirname}/../../local-data-base/boards/${id}.json`
  );
  if (!doesResourceExist) {
    return null;
  }
  return dataBaseService.getSpecifiedResource(
    `${__dirname}/../../local-data-base/boards/${id}.json`
  );
};

const checkIfBoardExist = async (boardId) => dataBaseService.checkIfResourceExist(
    `${__dirname}/../../local-data-base/boards/${boardId}.json`
  );

const createBoard = async (board) => dataBaseService.createEntity('boards', board.id, board);

const updateBoard = async (boardId, board) => dataBaseService.updateEntity('boards', boardId, board);

const deleteBoard = async (id) => dataBaseService.deleteEntity('boards', id);

module.exports = {
  getAll,
  checkIfBoardExist,
  getById,
  createBoard,
  updateBoard,
  deleteBoard,
};
