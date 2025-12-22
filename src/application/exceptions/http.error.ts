import { HttpError as OpenApiHttpError } from 'express-openapi-validator/dist/framework/types';

export { OpenApiHttpError };
export class HttpError extends OpenApiHttpError {
  readonly message: string;

  readonly name: string;

  readonly status: number;

  constructor(message: string, status: number, name: string) {
    super({
      status,
      path: '',
      name,
      message,
    });

    this.message = message || 'Server error!';

    this.name = name || 'Http Error';

    this.status = status || 500;
  }

  getCode(): number {
    return this.status;
  }

  getErrors(): any {
    return this.errors;
  }

  getMessage(): string {
    return this.message;
  }
}
