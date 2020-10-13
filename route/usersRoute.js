const express = require('express');
const passport = require('passport');
const User = require('../models/usersModels');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const validate = require('../validate/validate')
const loginEmail = require('../controllers/sendMail')
const authRouter = express.Router();
const verifyJwt = require('../validate/verifyToken');
require('dotenv/config')

authRouter.use(bodyParser.json())

authRouter.post('/login',  
    passport.authenticate('local', {successRedirect: '/users/dashboard', successMessage: 'You are logged in', failureRedirect : '/login'}),

)

authRouter.get('/dashboard', verifyJwt, (req, res, next)=>{
    res.status(200).send({response: 'You are logged in'})
})
authRouter.get('/login', (req, res, next) => {
    res.status(200).send({response : 'login page'})
})

authRouter.get('/logout', (req, res, next) => {
    if(req.session) {
        req.session.destroy( (err) => {
            if(err){
            return next(err)
        } 
    else{
    res.redirect('/login')       
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
                    .then(user => {
                            loginEmail.sendConfirmationEmail(user)
                        res.status(200).send({response: "Mail sent successfully"})})
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
            loginEmail.forgotPasssword(user)
        res.status(200).send('mail is sent, check your mail')
        }
        
    }).catch(err => (err) )
})

authRouter.patch('/change-password', verifyJwt, async (req, res, next) => {
    const {password, email} = req.body
        if(email === undefined || null){
        res.status(404).send({response: 'empty'})
    }
        User.findOne({email}).then( result => {
            console.log(result)
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) {
                        return res.status(400).send({response: 'Error changing password'})
                    }
                    result.password = hash
                    result.save().then(e =>{
                        res.status(200).send({success: true, response: 'Password changed'})
                    } ).catch(err => res.json(err))
                })
            })
        })
    
}) 

authRouter.get('/authenticateToken', verifyJwt, (req, res) => {
    res.status(200).send({response: 'Password reset page'})

  })

authRouter.put('/reset-password', verifyJwt, (res, req, next) => {
    const {password, old_password, email } = req.body
    User.findOne({email}).then( result => {
        if(!result.password) {
            res.status(400).send({response: 'There is no password'})
        }
        bcrypt.compare(old_password, result.password), (err, hash) => {
            bcrypt.hash(password, 10).then( pass => {
                if(err){
                    console.log('Error changing password')
                }
                result.password = hash 
                result
                .save().then( e => {
                    return res.status(200).send({response: 'Sucessfully changed password'})
                }).catch(err =>  err)
                
            }).catch(err => {
                console.log('Error hashing password')
            })
        }
        
    }).catch(err=> err)
})

module.exports = authRouter;