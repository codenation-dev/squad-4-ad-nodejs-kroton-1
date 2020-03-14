const express = require('express')
const router = express.Router()
const users = require('./users')
const logs = require('./logs')
const auth = require('./auth')


router.get('/', (req, res) => {
  res.json({
    auth: {
      login: 'http://localhost:8080/v1/auth/login'
    },
    users: 'http://localhost:8080/v1/users',
    logs: 'http://localhost:8080/v1/logs'
  })
})

router.use('/users', users)
router.use('/logs', logs)
router.use('/auth', auth)

module.exports = router