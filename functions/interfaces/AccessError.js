class AccessError extends Error {
  constructor(invalidAccess) {
    const message = `You dont have ${JSON.stringify(
      invalidAccess
    )} permissions!`;
    super(message);
    this.name = "AccessError";
    Object.setPrototypeOf(this, AccessError.prototype);
  }
}

AccessError.prototype.constructor = AccessError;

export default AccessError;
