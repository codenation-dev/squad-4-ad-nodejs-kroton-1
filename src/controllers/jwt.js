var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;


var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken') 
var randtoken = require('rand-token') 

var refreshTokens = {} 
var SECRET = "SECRETO_PARA_ENCRIPTACION" 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.listen(port);


app.post('/login', function (req, res, next) { 
  var username = req.body.username 
  var password = req.body.password
  var user = { 
    'username': username, 
    'role': 'admin',
    'email': 'infofranco2005' ,
    'password': password
  } 
  var token = jwt.sign(user, SECRET, { expiresIn: 300 }) 
  var refreshToken = randtoken.uid(256) 
  refreshTokens[refreshToken] = username,
   res.json({token: 'JWT ' + token, refreshToken: refreshToken}) 
});


  
console.log('todo list RESTful API server started on: ' + port);  
