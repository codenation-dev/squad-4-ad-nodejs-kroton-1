const config = require('../config/config.js')

const mysql = require('mysql2')

const con = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password
})
con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
  con.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database}`)
  con.query(`CREATE DATABASE IF NOT EXISTS node_logs_test`, function (err, result) {
    if (err) throw err
    console.log('Database created!')
    .then(() => process.exit(0))
  })
})
