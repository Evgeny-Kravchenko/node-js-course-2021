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

const updateBoard = (boardId: string, body: IBoard): IBoard => {
  const newBoard = { ...body, id: boardId };
  boardsRepo.updateBoard(boardId, newBoard);
  return Board.toResponse(newBoard);
};

const deleteBoard = (id: string): string => {
  taskService.deleteTasksByBoardId(id);
  boardsRepo.deleteBoard(id);
  return id;
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
