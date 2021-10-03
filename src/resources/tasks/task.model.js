const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'TITLE',
    order = 'ORDER',
    description = null,
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(board) {
    const { id, title, order, description, userId, boardId, columnId } = board;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
