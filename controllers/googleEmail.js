const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')
const User = require('../models/usersModels')
require('dotenv/config')

function googleAuth(app) {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_SECRET_KEY,
    callbackURL : process.env.GOOGLE_REDIRECT_URL,
    passReqToCallback : true,
},
function(request, accessToken, refreshToken, profile, done){
    User.findOrCreate({ googleID : profile.id}, (err, user)=>{
        return done(err, user)
    })
}
))
app.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get('/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

}
module.exports = googleAuth;