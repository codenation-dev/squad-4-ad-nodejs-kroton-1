const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/v1', routes)

module.exports = { app }
