const model = require('../models').users
const jwt = require('jsonwebtoken')
const crypt = require('../crypto/crty_dcryp')

const Auth = {}

Auth.getToken = (req, res, next) => {
  const { email, password } = req.body
  const userEmail = model.findOne( { where: { email: email } } )
 
  if (( userEmail === null) || ( password !== crypt.descriptografar(userEmail.password))) {
    return res.status(401).send({ error: 'Invalid user or password.' })
  }

  const token = jwt.sing({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
  res.status(200).send({ token: token })
}
  
module.exports = Auth
