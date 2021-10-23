import { v4 as uuidv4 } from 'uuid';

export interface ITask {
  id?: string;
  title: string;
  order: string | number;
  description: string | null;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export class Task implements ITask {
  id;

  title;

  order;

  description;

  userId;

  boardId;

  columnId;

  constructor({
    id = uuidv4(),
    title = 'TITLE',
    order = 'ORDER',
    description = null,
    userId = null,
    boardId = null,
    columnId = null,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITask): ITask {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
