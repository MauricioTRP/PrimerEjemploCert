const ViewsController = {}

ViewsController.home = (req, res, next) => {
  res.render('home')
}

ViewsController.register = (req, res, next) => {
  res.render('register', { layout: 'loginLayout' })
}

module.exports = {
  ViewsController
}