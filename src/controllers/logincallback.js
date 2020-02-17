var express = require('express'),
app = express(),
port = process.env.PORT || 3000;

//var passport = require("passport");
//var OAuth2Strategy = require('passport-oauth2').Strategy;
//var ExtractJwt = require('passport-jwt').ExtractJwt;

var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
done(null, user.username)
})



//var token = jwt.sign(user, "SECRET", { expiresIn: 300 })



var opts = {}

// Setup JWT options
opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
opts.secretOrKey = "SECRET"

passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
//If the token has expiration, raise unauthorized
var expirationDate = new Date(jwtPayload.exp * 1000)
if(expirationDate < new Date()) {
  return done(null, false);
}
var user = jwtPayload
done(null, user)
}))




/*
passport.deserializeUser(function (username, done) {
done(null, username)
})
*/




//   passport.use(new OAuth2Strategy({
//     authorizationURL: 'https://www.SQUAD4.com/oauth2/authorize',
//     tokenURL: 'https://www.SQUAD4.com/oauth2/token',
//     clientID: "SQUAD4_developer",
//     clientSecret: "client_secret_squad4",
//     callbackURL: "http://localhost:3000/auth/squad4/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


app.listen(port);


app.get('/auth',
passport.authenticate('jwt'),function(req,res){
res.json({success:'autenticado ok ',user: req.user})
});


app.get('/cris', passport.authenticate('oauth2', { session: true }),
function(req, res) {
  return res.send('Codenation é nois');
});


console.log('todo list RESTful API server started on: ' + port);    