const express = require('express')
const { ViewsController } = require('../controllers')

const router = express.Router()

router.get("/", ViewsController.home)
router.get("/register", ViewsController.register)

module.exports = {
  ViewsRouter: router
}