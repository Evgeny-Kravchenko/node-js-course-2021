export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface IBoard {
  id?: string;
  title: string;
  columns: { order: number; title: string }[];
}

export interface ITask {
  id?: string;
  title: string;
  order: number;
  description?: string | null;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}
