const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/v1/docs-api-error', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/v1', routes)

module.exports = { app }
