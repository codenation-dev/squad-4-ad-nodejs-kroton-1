const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')
const verifyToken = require('../middleware/auth')
const authorizationUser = require('../middleware/auth_admin')

router.get('/', verifyToken, controller.getAll)

router.get('/:usersId', verifyToken, controller.getById)

router.post('/', verifyToken, authorizationUser, controller.create)

router.patch('/:usersId', verifyToken, authorizationUser, controller.update)

router.delete('/:usersId', verifyToken, authorizationUser, controller.delete)

module.exports = router
