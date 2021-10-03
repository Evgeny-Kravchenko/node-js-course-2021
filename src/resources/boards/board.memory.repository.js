let BOARDS = [];

const getAll = async () => BOARDS;

const getById = async (id) => {
  const board = BOARDS.find((item) => item.id === id);
  return board;
};

const checkIfBoardExist = async (boardId) =>
  BOARDS.some((item) => item.id === boardId);

const createBoard = async (board) => {
  BOARDS.push(board);
  return board;
};

const updateBoard = async (boardId, board) => {
  BOARDS = BOARDS.map((item) => {
    if (item.id === boardId) {
      return board;
    }
    return item;
  });
  return board;
};

const deleteBoard = async (id) => {
  BOARDS = BOARDS.filter((item) => item.id !== id);
  return id;
};

module.exports = {
  getAll,
  checkIfBoardExist,
  getById,
  createBoard,
  updateBoard,
  deleteBoard,
};
