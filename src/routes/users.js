const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, controller.getAll)

router.get('/:usersId', verifyToken, controller.getById)

router.post('/', verifyToken, controller.create)

router.put('/:usersId', verifyToken, controller.update)

router.delete('/:usersId', verifyToken, controller.delete)

module.exports = router
