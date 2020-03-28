const model = require('../models').users
const jwt = require('jsonwebtoken')
const crypt = require('../crypto/crty_dcryp')

const Auth = {}

Auth.getToken = (req, res, next) => {
  const { email, password } = req.body
  model.findOne({ where: { email: email } })
    .then(userEmail => {
      if ((userEmail === null) || (password !== crypt.descriptografar(userEmail.password))) {
        res.status(401).json({ error: 'Invalid user or password.' })
      } else {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        res.status(200).send({ token: token })
      }
    })
}

module.exports = Auth
