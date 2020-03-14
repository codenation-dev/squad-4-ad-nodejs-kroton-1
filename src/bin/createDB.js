const config = require('../config/config')

const mysql = require('mysql2'); 

const con = mysql.createConnection({  
    host: config.db.host,  
    user: config.db.user, 
    password: config.db.password 
}) 
con.connect(function(err) {  
    if (err) throw err
    console.log("Connected!")
con.query(`CREATE DATABASE ${config.db.database}`, function (err, result) {  
    if (err) throw err
    console.log("Database created!")
})
})

