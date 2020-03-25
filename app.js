const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use(bodyParser.json())

app.use('/v1', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

module.exports = { app }