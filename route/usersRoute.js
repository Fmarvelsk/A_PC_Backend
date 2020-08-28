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
       
    })
        var userData ={
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
 }
       bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userData.password, salt, (err, hash) => {
          if (err) throw err
          userData.password = hash
          userData.save((err, user)=> {
            if (err) {
                 
                return next(err)
              } else {
               
                res.json(user)
                res.redirect('/profile');
              }
    
           })
           })
           
            })


 
})

module.exports = authRouter;