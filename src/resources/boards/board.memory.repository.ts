import { IBoard } from './board.model';

let BOARDS: IBoard[] = [];

/**
 * @namespace BoardRepository
 */

/** This function returns all boards from the repository
 * @memberof BoardRepository
 * @returns {Array}
 */
const getAll = async (): Promise<IBoard[]> => BOARDS;

/**
 * @memberof BoardRepository
 * @param {string} id
 * This function returns a board by id from the repository */
const getById = async (id: string): Promise<IBoard | undefined> => {
  const board = BOARDS.find((item) => item.id === id);
  return board;
};

/**
 * @memberof BoardRepository
 * @param {string} boardId
 * This function check if a board exists in the repository */
const checkIfBoardExist = async (boardId: string): Promise<boolean> =>
  BOARDS.some((item) => item.id === boardId);

/**
 * The function create a board in the repository
 * @memberof BoardRepository
 * @param {Object} board Information about a board
 * @param {String} board.id Uniq id of a board
 * @param {String} board.title A title of a board
 * @param {Array} board.columns Array of column
 *  */
const createBoard = async (board: IBoard): Promise<IBoard> => {
  BOARDS.push(board);
  return board;
};

/**
 * The function update a board in the repository
 * @memberof BoardRepository
 * @param {String} boardId Uniq id of a board
 * @param {Object} board Information about a board
 * @param {String} board.id Uniq id of a board
 * @param {String} board.title A title of a board
 * @param {Array} board.columns Array of column
 */
const updateBoard = async (boardId: string, board: IBoard): Promise<IBoard> => {
  BOARDS = BOARDS.map((item) => {
    if (item.id === boardId) {
      return board;
    }
    return item;
  });
  return board;
};

/**
 * The function delete a board in the repository
 * @memberof BoardRepository
 * @param {String} id A uniq id of a board
 */
const deleteBoard = async (id: string): Promise<string> => {
  BOARDS = BOARDS.filter((item) => item.id !== id);
  return id;
};

export {
  getAll,
  checkIfBoardExist,
  getById,
  createBoard,
  updateBoard,
  deleteBoard,
};
