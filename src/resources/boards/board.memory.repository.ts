import { getRepository } from 'typeorm';

import Board from '../../entities/Board';
import { IBoard } from '../../common/types';

/**
 * @namespace BoardRepository
 */

/** This function returns all boards from the repository
 * @memberof BoardRepository
 * @returns {Array}
 */
const getAll = async (): Promise<Board[]> => {
  const boardRepo = getRepository(Board);
  return boardRepo.find({ where: {} });
};

/**
 * @memberof BoardRepository
 * @param {string} id
 * This function returns a board by id from the repository */
const getById = async (id: string): Promise<Board | undefined> => {
  const boardRepo = getRepository(Board);
  return boardRepo.findOne(id);
};

/**
 * @memberof BoardRepository
 * @param {string} boardId
 * This function check if a board exists in the repository */
const checkIfBoardExist = async (boardId: string): Promise<boolean> => {
  const board = await getById(boardId);
  return Boolean(board);
};

/**
 * The function create a board in the repository
 * @memberof BoardRepository
 * @param {Object} board Information about a board
 * @param {String} board.id Uniq id of a board
 * @param {String} board.title A title of a board
 * @param {Array} board.columns Array of column
 *  */
const createBoard = async (dto: IBoard): Promise<Board> => {
  const boardRepo = getRepository(Board);
  const board = boardRepo.create(dto);
  const savedBoard = await boardRepo.save(board);
  return savedBoard;
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
const updateBoard = async (
  boardId: string,
  dto: IBoard
): Promise<Board | null> => {
  const boardRepo = getRepository(Board);
  const doesBoardExist = await checkIfBoardExist(boardId);
  if (!doesBoardExist) {
    return null;
  }
  const updatedRes = await boardRepo.update(boardId, dto);
  return updatedRes.raw;
};

/**
 * The function delete a board in the repository
 * @memberof BoardRepository
 * @param {String} id A uniq id of a board
 */
const deleteBoard = async (id: string): Promise<boolean> => {
  const boardRepo = getRepository(Board);
  const deletedRes = await boardRepo.delete(id);
  return Boolean(deletedRes.affected);
};

export {
  getAll,
  checkIfBoardExist,
  getById,
  createBoard,
  updateBoard,
  deleteBoard,
};
