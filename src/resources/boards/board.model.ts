import { v4 as uuidv4 } from 'uuid';

export interface IBoard {
  id?: string;
  title: string;
  columns: string;
}

export class Board implements IBoard {
  id;

  title;

  columns;

  constructor({ id = uuidv4(), title = 'TITLE', columns = 'columns' }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
