const express = require('express')
const router = express.Router()
const controller = require('../controllers/log')
const  verifyToken = require('../middleware/auth')

router.get('/', verifyToken, controller.getAll)

router.get('/:logsId', verifyToken, controller.getById)

router.post('/', controller.save)  //ENPOINT QUE ENVIA OS ERROS PARA O BANCO, PRECISA COLOCAR UMA LOGICA PARA CHAMAR ELE APENAS EM ERRO

router.put('/:logsId', verifyToken, controller.update)

router.delete('/:logsId', verifyToken, controller.delete)

module.exports = router