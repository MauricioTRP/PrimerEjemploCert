const express = require('express')
const { ViewsController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')

const router = express.Router()

router.get("/", ViewsController.home)
router.get("/register", ViewsController.register)

router.get("/admin", AuthMiddleware, ViewsController.admin)

module.exports = {
  ViewsRouter: router
}