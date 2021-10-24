import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class NotFoundError extends Error {
  status = StatusCodes.NOT_FOUND;

  text = getReasonPhrase(StatusCodes.NOT_FOUND);
}
