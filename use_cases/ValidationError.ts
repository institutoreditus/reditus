export default class ValidationError extends Error {
  status: number;
  message: string;

  constructor(message: string) {
    super(message);
    this.status = 400;
    this.message = message;
  }
}
