const model = require('../models').users

const Users = {}

Users.getAll = async (req, res, next) => {
  const data = await model.findAll({})

  res.status(200).json({
    total: data.length,
    data
  })
}

Users.getById = async (req, res, next) => {
  const { usersId } = req.params
  const data = await model.findOne({
    where: { id: usersId }
  })

  res.status(200).json(data)
}

Users.create = async (req, res, next) => {
  const result = await model.create(req.body)
<<<<<<< HEAD

=======
>>>>>>> 1dc54c0b21df53895bd31a0da0acf91d8cb0759b
  res.status(201).json({ result })
}

Users.update = async (req, res, next) => {
  const { usersId } = req.params
  const result = await model.update(req.body, {
    where: { id: usersId }
  })

  res.status(200).json({ result })
}

Users.delete = async (req, res, next) => {
  const { usersId } = req.params
  const result = await model.destroy({
    where: { id: usersId }
  })

  res.status(204).json({ result })
}

<<<<<<< HEAD
module.exports = Users
=======
module.exports = Users
>>>>>>> 1dc54c0b21df53895bd31a0da0acf91d8cb0759b
