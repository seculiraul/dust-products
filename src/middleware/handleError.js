module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode ?? 500
  error.message = error.message ?? 'Something went wrong'

  res.status(error.statusCode).json({
    message: error.message,
    code: error.statusCode,
  })
}
