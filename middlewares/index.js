const { errorHandler } = require('./ErrorMiddleware')
const { AuthMiddleware, AdminMiddleware } = require('./AuthMiddleware')

module.exports = {
  errorHandler,
  AuthMiddleware,
  AdminMiddleware
}