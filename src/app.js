const express = require('express')
const app = express()


app.listen(8080, function () {
    console.info('%s listening at port %s', app.name, 8080)
  })

module.exports = app