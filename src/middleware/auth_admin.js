const model = require('../models').users

module.exports = (req, res, next) => {
  const decoded = req.user

  model.findOne({ where: { email: decoded.email } })
    .then(response => {
      if (!response.isAdmin) {
        return res.status(401).send({ message: 'Not authorized to access this resource' })
      } else {
        return next()
      }
    })
}
