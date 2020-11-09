class ExtensionError extends Error {
  constructor(invalidAccess) {
    const message = `File should be one of type ${JSON.stringify(
      invalidAccess
    )}`;
    super(message);
    this.name = 'ExtensionError';
    Object.setPrototypeOf(this, ExtensionError.prototype);
  }
}

ExtensionError.prototype.constructor = ExtensionError;

module.exports = ExtensionError;
