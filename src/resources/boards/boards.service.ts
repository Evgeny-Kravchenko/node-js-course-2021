import * as boardsRepo from './board.memory.repository';
import Board from '../../entities/Board';
import { IBoard } from '../../common/types';

const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

const getById = async (id: string): Promise<IBoard | undefined> => {
  const board = await boardsRepo.getById(id);
  return board ? Board.toResponse(board) : board;
};

const createBoard = async (dto: IBoard): Promise<IBoard> => {
  return boardsRepo.createBoard(dto);
};

const updateBoard = async (
  boardId: string,
  dto: IBoard
): Promise<IBoard | null> => {
  return boardsRepo.updateBoard(boardId, dto);
};

const deleteBoard = async (id: string): Promise<boolean> => {
  return boardsRepo.deleteBoard(id);
};

const checkIfBoardExist = (boardId: string): Promise<boolean> =>
  boardsRepo.checkIfBoardExist(boardId);

export {
  getAll,
  getById,
  checkIfBoardExist,
  createBoard,
  updateBoard,
  deleteBoard,
};
