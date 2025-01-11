const ViewsController = {}

ViewsController.home = (req, res, next) => {
  res.render('home')
}

ViewsController.register = (req, res, next) => {
  res.render('register')
}

ViewsController.admin = (req, res, next) => {
  if(req?.user?.role == 'admin') {
    return res.render('admin')
  }

  return res.status(401).redirect('/')
}

ViewsController.login = (req, res, next) => {
  res.render('login')
}

module.exports = {
  ViewsController
}