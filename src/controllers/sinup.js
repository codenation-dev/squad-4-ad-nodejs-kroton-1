const model = require('../models').users
const crypt = require('../crypto/crty_dcryp')

const Sinup = {}

Sinup.create = async (req, res, next) => {
  let { name, username, password, email } = req.body
  password = crypt.criptografar(password)

  const findUndUser = await model.findOne({ where: { email } })
  if (findUndUser) { return res.status(400).json({ message: 'This user already exists' }) }

  const isAdmin = 0
  const body = {
    name, username, password, email, isAdmin
  }
  await model.create(body)
  res.status(201).json({ Message: 'Registration completed successfully' })
}

module.exports = Sinup
