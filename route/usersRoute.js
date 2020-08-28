const express = require('express');
const passport = require('passport');
const User = require('../models/usersModels');
<<<<<<< HEAD
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
=======
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

>>>>>>> mess
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
<<<<<<< HEAD
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
=======
    const {email, username, password} = req.body
    if(req.body){
        User.findOne({email}).then(data => {
            if(data) {
               return res.status(400).send('Email already exist')
            }
        })
    var userData ={
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,        

 }
 bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(userData.password, salt, function(err, hash) {
        
    });
});
   User.create(userData).then(user => res.json(user))
 .catch( err => err)
    }  
>>>>>>> mess
 
})

module.exports = authRouter;