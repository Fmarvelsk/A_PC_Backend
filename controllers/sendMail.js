const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken')


const options = {
    auth: {
        api_key: process.env.SENDGRID_PASSWORD,
    }
}
     
const mailer = nodemailer.createTransport(sgTransport(options));

exports.sendConfirmationEmail = async (user) => {
    console.log(user)
    const newjwt = await jwt.sign({
        _id : user._id   
    }, process.env.JWT_WEBTOKEN)
const email = {
    to: user.email,
    from: process.env.SENDER_MAIL,
    subject: 'Confirmaion mail',
    html: `<b>This account signup to A&PC confirm your mail by clicking the link <a href=http://localhost:5555/users/dashboard/${newjwt}>Click to confirm</a></b>`
};
 
mailer.sendMail(email, function(err, res) {
    console.log(email)
    if (err) { 
        console.log(err) 
    }
    console.log(res);
})
}
exports.forgotPasssword =  async (user) => {
    const newjwt = await jwt.sign({
        _id : user._id   
    },process.env.JWT_WEBTOKEN,{
        expiresIn: '300s',
    })
    console.log(newjwt)
const forgotemail = {
    to: user.email,
    from: process.env.SENDER_MAIL,
    subject: 'Forogt Password',
    html: `<b>Click thr link to change password. Token expires in 5minutes <a href=http://localhost:5555/users/authenticateToken/${newjwt}>Click to confirm</a></b>`
};
  
mailer.sendMail(forgotemail, function(err, res) {
    if (err) { 
        console.log(err) 
    }
    console.log(res);
})
}