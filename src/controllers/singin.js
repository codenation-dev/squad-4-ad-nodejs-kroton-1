const model = require('../models').users
const crypt = require('../crypto/crty_dcryp')

const Singin = {}

Singin.create = async (req, res, next) => {
  let { name, username, password, email } = req.body
  password = crypt.criptografar(password)

  const body = {
    name, username, password, email
  }
  await model.create(body)
  res.status(201).json({ Message: 'Usuario cadastrado com sucesso' })
}

module.exports = Singin
