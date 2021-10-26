import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class ValidationError extends Error {
  status = StatusCodes.BAD_REQUEST;

  text = getReasonPhrase(StatusCodes.BAD_REQUEST);
}
