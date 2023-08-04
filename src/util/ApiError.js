class ApiError extends Error {
  constructor(message, statusCode) {
    super(message)

    this.message = message
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constrctor)
  }
}

module.exports = ApiError
