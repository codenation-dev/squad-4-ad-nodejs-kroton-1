const model = require('../models')['users']
const crypt = require('../crypto/crty_dcryp')

let Singin = {}

Singin.create = async (req, res, next) => {
 const {nome, username, password, email} = res.body 
 const crtuser = crypt.criptografar(password)
 let body = {
     nome, username, crtuser, email
 }
  const result = await model.create(body)
  res.status(201).json({ Message:"Usuario cadastrado com sucesso" })
}

module.exports = Singin