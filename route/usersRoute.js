const express = require('express');
const passport = require('passport');
const User = require('../models/usersModels');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const authRouter = express.Router();


authRouter.use(bodyParser.json())

authRouter.post('/login',  
    passport.authenticate('local', {successRedirect: '/', failureRedirect : '/login'}),
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
       User.findOne(req.body.email).then(user => {
           if(user){
              return errors.email = 'Email already exist'
               
           }
       else{
           var userData = new User({
           email : req.body.email,
           username : req.body.username,
           password : req.body.password,
           
           })
      userData.create().then(data => res.json(data))
        
        } 
    }).catch(err=> err)
 
})

module.exports = authRouter;