const express = require('express')
const router = express.Router()
const controller = require('../controllers/log')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, controller.getAll)

router.get('/:logsId', verifyToken, controller.getById)

router.post('/', controller.create)

router.put('/:logsId', verifyToken, controller.update)

router.delete('/:logsId', verifyToken, controller.delete)

module.exports = router
