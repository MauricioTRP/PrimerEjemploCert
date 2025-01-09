const ViewsController = {}

ViewsController.home = (req, res, next) => {
  res.render('home')
}

ViewsController.register = (req, res, next) => {
  res.render('register')
}

ViewsController.admin = (req, res, next) => {
  res.render('admin')
}

module.exports = {
  ViewsController
}