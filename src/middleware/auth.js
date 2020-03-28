const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token']
  if (!token) return res.status(401).send({ message: 'Token not found!' })

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(501).send({ error: 'Invalid token.' })

    req.user = decoded
    next()
  })
}
