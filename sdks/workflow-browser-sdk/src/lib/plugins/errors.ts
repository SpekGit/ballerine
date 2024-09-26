export class LocalStoragePersistError extends Error {
  cause: Error;

  constructor(message: string, cause: Error) {
    super(message);
    this.cause = cause;
    this.name = 'LocalStoragePersistError';
  }
}
