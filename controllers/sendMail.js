const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken')

module.exports = (user) => {
     
const options = {
    auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD,
    }
}
    
const mailer = nodemailer.createTransport(sgTransport(options));

const SendConfirmationEmail = async () => {
    const jwt = await jwt.signin({
        _id : user_id   
    }, process.env.JWT_WEBTOKEN)
const email = {
    to: user.email,
    from: process.env.SENDER_MAIL,
    subject: 'Confirmaion Email',
    text: 'Awesome sauce',
    html: '<b>Awesome sauce</b>'
};
 
mailer.sendMail(email, function(err, res) {
    if (err) { 
        console.log(err) 
    }
    console.log(res);
})
}
const forgotPasswordEmail = async () => {
    const jwt = await jwt.signin({
        _id : user_id   
    }, process.env.JWT_WEBTOKEN)
    const forgotPassword = {
        to: user.email,
        from: process.env.SENDER_MAIL,
        subject: 'Retrieve Password',
        text: 'Awesome sauce',
        html: '<b>Awesome sauce</b>'
    }
mailer.sendMail(forgotPassword, (err, res) => {
    if(err){
        console.log(err)
    }
    else{
        console.log(res)
    }
})
}
}