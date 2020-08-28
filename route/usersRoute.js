const express = require('express');
const passport = require('passport');
const User = require('../models/usersModels');
const bodyParser = require('body-parser');
const user = require('../models/usersModels');

const authRouter = express.Router();


authRouter.use(bodyParser.json())

authRouter.post('/login',  
    passport.authenticate('local', {successRedirect: '/', successMessage: 'You are logged in', failureRedirect : '/login'}),
    (req, res, next) => {
  res.redirect('/')
  
    }    
)

authRouter.get('/logout', (req, res, next) => {
    if(req.session) {
        req.session.destroy( (err) => {
            if(err){
            return next(err)
        } 
    else{
    res.redirect('/')       
    }}
        )
    }
  
})

authRouter.post('/signup', (req, res, next) => {
    if(req.body.email && req.body.username && req.body.password){
        User.findOne(req.body.email).then(data => {
            if
        })
    var userData ={
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        

 }
 User.create(userData).then(user => res.json(user))
 .catch( err => err)
    }
 
})

module.exports = authRouter;