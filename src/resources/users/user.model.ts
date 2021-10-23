import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export default class User implements IUser {
  id = '';

  name = '';

  login = '';

  password = '';

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): Omit<IUser, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}