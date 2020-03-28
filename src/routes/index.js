const express = require('express')
const router = express.Router()
const users = require('./users')
const logs = require('./logs')
const auth = require('./auth')
const sinup = require('./sinup')

router.get('/', (req, res) => {
  res.json({
    auth: {
      login: 'http://localhost:8080/v1/auth/login'
    },
    users: 'http://localhost:8080/v1/users',
    logs: 'http://localhost:8080/v1/logs',
    sinup: 'http://localhost:8080/v1/sinup'
  })
})

router.use('/users', users)
router.use('/logs', logs)
router.use('/auth', auth)
router.use('/sinup', sinup)

module.exports = router
