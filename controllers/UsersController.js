const db = require('../models');
const { User, Book } = db
const path = require('node:path')
const { randomUUID } = require('node:crypto')
const { promisify } = require('node:util')

const UsersController = {}

UsersController.create = async (req, res, next) => {
  const data = req.body
  const { picture } = req.files
  delete data.role
  const mvPicture = promisify(picture.mv)

  try {
    const pictureName = randomUUID()  + '.' + picture.name.split('.')[1]
    await mvPicture(path.join(__dirname, '..', 'public', 'assets', 'img', pictureName ))
    data.pictureUrl = `./assets/img/${pictureName}`

    const user = await  User.create(data)

    return res.json(user)
  } catch (err) {
    next(err)
  }

}

UsersController.update = async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  try {
    const user = await User.update(data, { where: { id }, individualHooks: true });

    /**
     * user = await User.findByPk(id)
     * user.password = data.password
     * user.save()
     */

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

//Eliminar user
UsersController.deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.destroy({ where: { id } })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no Encontrado' })
    }
    return res.status(201).json({ message: 'Libro eliminado' })
  } catch (err) {
    next(err)
  }
}

//buscar user por id
UsersController.findByidUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.json(user)
  } catch (err) {
    next(err)
  }
}

//listar User
UsersController.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll()
    return res.json(user)
  } catch (err) {
    next(err)
  }
}

UsersController.changeStatus = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    user.isActive = !user.isActive

    const status = user.isActive ? 'Activado' : 'Desactivado'
    await user.save()
    return res.json({ message: `User ${status}` })
  } catch (err) {
    next(err)
  }
}

// // endpoint protegido
// // { _id: idUsuarioLogeado }
// UsersController.findPurchases = async (req, res, next) => {
//   const { user } = req
//   try {
//     const userResult = await User.findByPk(user._id, { include: Book })

//     return res.json(userResult)
//   } catch (err) {
//     next(err)
//   }
// }

module.exports = { UsersController }
