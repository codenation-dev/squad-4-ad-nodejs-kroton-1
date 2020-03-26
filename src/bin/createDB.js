const config = require('../config')
require('dotenv').config()

const mysql = require('mysql2')

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_USER)
console.log(process.env.DB_HOST)
con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
  con.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database}`, function (err, result) {
    if (err) throw err
    console.log('Database created!')
    process.exit(0)
  })
})
