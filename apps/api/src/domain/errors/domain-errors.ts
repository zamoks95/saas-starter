export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string, id: string) {
    super(`${resource} with id '${id}' not found`);
  }
}

export class ValidationError extends DomainError {
  public readonly details: string[];

  constructor(message: string, details: string[] = []) {
    super(message);
    this.details = details;
  }
}
