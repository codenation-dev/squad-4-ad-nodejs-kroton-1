const model = require('../models').users

const Users = {}

Users.getAll = async (req, res, next) => {
  const data = await model.findAll({ attributes: { exclude: ['password', 'isAdmin'] } })

  res.status(200).json({
    total: data.length,
    data
  })
}

Users.getById = async (req, res, next) => {
  const { usersId } = req.params
  const data = await model.findOne({
    where: { id: usersId }, attributes: { exclude: ['password', 'isAdmin'] }
  })

  res.status(200).json(data)
}

Users.create = async (req, res, next) => {
  const result = await model.create(req.body)
  res.status(201).json({ message: 'User successfully registered' })
}

Users.update = async (req, res, next) => {
  const { usersId } = req.params
  await model.update(req.body, {
    where: { id: usersId }
  })

  res.status(200).json({message: 'The data sent has been updated successfully' })
}

Users.delete = async (req, res, next) => {
  const { usersId } = req.params
  await model.destroy({
    where: { id: usersId }
  })

  res.status(204).json({ message: 'Data deleted from the database' })
}

module.exports = Users
