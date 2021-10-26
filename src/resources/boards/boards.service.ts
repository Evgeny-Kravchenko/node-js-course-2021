import { Board, IBoard } from './board.model';
import * as boardsRepo from './board.memory.repository';
import * as taskService from '../tasks/tasks.service';

const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

const getById = async (id: string): Promise<IBoard | undefined> => {
  const board = await boardsRepo.getById(id);
  return board ? Board.toResponse(board) : board;
};

const createBoard = async ({ title, columns }: IBoard): Promise<IBoard> => {
  const board = new Board({ title, columns });
  boardsRepo.createBoard(board);
  return Board.toResponse(board);
};

const updateBoard = async (
  boardId: string,
  body: IBoard
): Promise<IBoard | null> => {
  const newBoard = { ...body, id: boardId };
  const board = await boardsRepo.updateBoard(boardId, newBoard);
  return board ? Board.toResponse(newBoard) : null;
};

const deleteBoard = async (id: string): Promise<boolean> => {
  taskService.deleteTasksByBoardId(id);
  const isDeleted = await boardsRepo.deleteBoard(id);
  return isDeleted;
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
