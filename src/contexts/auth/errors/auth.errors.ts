import { DomainError } from '../../../core/errors/domain-error';

export class UserAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super({ code: 'USER_ALREADY_EXISTS', message: `User ${email} already exists`, statusCode: 409 });
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password', statusCode: 401 });
  }
}