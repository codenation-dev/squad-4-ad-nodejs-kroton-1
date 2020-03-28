const express = require('express')
const router = express.Router()
const controller = require('../controllers/log')
const verifyToken = require('../middleware/auth')
const authorizationUser = require('../middleware/auth_admin')

router.get('/', verifyToken, controller.getAll)

router.get('/:logsId', verifyToken, controller.getById)

router.post('/', controller.create)

router.patch('/:logsId', verifyToken, authorizationUser, controller.update)

router.delete('/:logsId', verifyToken, authorizationUser, controller.delete)

module.exports = router
