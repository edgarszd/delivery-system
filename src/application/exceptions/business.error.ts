import { HttpError } from './http.error';

export class BusinessError extends HttpError {
  constructor(message: string = 'Business error') {
    const status = 422;

    const name = 'BusinessError';

    super(message, status, name);
  }
}