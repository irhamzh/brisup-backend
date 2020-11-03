class InvalidRequestError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
    this.name = 'InvalidRequestError';

    Object.setPrototypeOf(this, InvalidRequestError.prototype);
  }
}

module.exports = InvalidRequestError;
