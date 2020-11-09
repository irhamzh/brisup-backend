class NotFoundError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

NotFoundError.prototype.constructor = NotFoundError;
module.exports = NotFoundError;
