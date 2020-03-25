const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')
const verifyToken = require('../middleware/auth')
const authorizationUser = require('../middleware/auth_admin')

router.get('/', verifyToken, controller.getAll)

router.get('/:usersId', verifyToken, controller.getById)

router.post('/', verifyToken, controller.create)

router.put('/:usersId', authorizationUser, controller.update)

router.delete('/:usersId', authorizationUser, controller.delete)

module.exports = router
