const express = require('express')
const { SessionsController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')

const router = express.Router()

router.post("/login", SessionsController.login)
router.delete("/logout", AuthMiddleware, SessionsController.logout)

module.exports = {
  SessionRouter: router
}
