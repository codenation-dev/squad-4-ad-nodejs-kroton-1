const express = require('express')
const router = express.Router()
const users = require('./users')
const logs = require('./logs')
const auth = require('./auth')
const singin = require('./singin')

router.get('/', (req, res) => {
  res.json({
    auth: {
      login: 'http://localhost:8080/v1/auth/login'
    },
    users: 'http://localhost:8080/v1/users',
    logs: 'http://localhost:8080/v1/logs',
    singin: 'http://localhost:8080/v1/singin'
  })
})

router.use('/users', users)
router.use('/logs', logs)
router.use('/auth', auth)
router.use('/singin', singin)

module.exports = router
