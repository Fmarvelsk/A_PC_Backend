const express = require('express');
const passport = require('passport');
const User = require('../models/usersModels');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const validate = require('../validate/validate')
const loginEmail = require('../controllers/sendMail')
const authRouter = express.Router();
const jwt = require('jsonwebtoken')
const verifyJwt =require('../validate/verifyToken');
const user = require('../models/usersModels');
require('dotenv/config')

authRouter.use(bodyParser.json())

authRouter.post('/login',  
    passport.authenticate('local', {successRedirect: '/', successMessage: 'You are logged in', failureRedirect : '/login'}),
    (req, res, next) => {
        const token = jwt.sign({
            _id : user_id
        }, process.env.JWT_WEBTOKEN)
  res.redirect('/')
  res.header('auth-token', token).send(token)
  
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
    const {error, isValid} = validate(req.body)
    
    if(!isValid){
        console.log(isValid)
        return res.status(404).send({ response: error})

    }
    const {email, username, password} = req.body
        User.findOne({email}).then(data => {
            if(data) {
               return res.status(400).send('Email already exist')
            }
            else{
                var userData =new User({
                    email,
                    username,
                    password,        
            
             })
             bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(userData.password, salt, function(err, hash) {
                    if (err) throw err
                    userData.password= hash
                    userData
                    .save()
                    .then(user => 
                        loginEmail.sendConfirmationEmail(user),
                        res.json(user))
                    .catch( err => err)
                });
            });

            }
        })
       
        
})

authRouter.get('/forgot-password', (req, res, next ) => {
    
    const { email } = req.body
    User.findOne({email}).then(user => {
        if(!user){
            return res.status(400).send({response : 'user not found'})
        }
        else {
            loginEmail.sendConfirmationEmail(user)
        res.status(200).send('mail is sent, check your mail')
        }
        
    }).catch(err => (err) )
})

authRouter.patch('/change-password', async (req, res, next) => {
    const {error, isValid} = validate(req.body)
    if(!isValid){
        res.status(404).send({response: error})
    }
    const { email } = req.body
    await verifyJwt()
        User.findBy({email}).then( result => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) {
                        return res.status(400).send({response: 'Error changing password'})
                    }
                    result.password = hash
                    result.save().then(e =>{
                        res.status(200).send({success: true, response: 'Password change'})
                    } ).catch(err => res.json(err))
                })
            })
        })
    
}) 

module.exports = authRouter;