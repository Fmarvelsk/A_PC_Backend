const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = (req, res, next) => {
    const token = res.header('auth-token')
    if(!token) return res.status(400).send('Access Denied')
        try {
            const verified = jwt.verify(token, process.env.JWT_WEBTOKEN)
            req.user = verified
            next()
        }
        catch(err){
            res.status(400).send('invalid Token', err)
        }
}