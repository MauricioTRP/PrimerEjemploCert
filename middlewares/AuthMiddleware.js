const { ValidateSignature } = require('../utils')

const AuthMiddleware = (req, res, next) => {
  const signature = ValidateSignature(req)

  try {
    if(signature) {
      return next()
    } else {
      throw new Error("Token Inválido", { cause: 'INVALID_CREDENTIALS' });
    }
  } catch (err) {
    next(err)
  }
}

const AdminMiddleware = (req, res, next) => {
  const signature = ValidateSignature(req)

  try {
    if(req?.user?.role == 'admin') {
      return next()
    } else {
      throw new Error("Token Inválido", { cause: 'INVALID_CREDENTIALS' });
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { 
  AuthMiddleware,
  AdminMiddleware
}
