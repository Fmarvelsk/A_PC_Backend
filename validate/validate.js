const validator = require('validator');
const isRequired = require('./isRequired')

const validatFunction = (data) => {

let error = {}

data.email = !isRequired(data.email) ? data.email : '',
data.password = !isRequired(data.password) ? data.password : ''

if(validator.isEmpty(data.email)){
    error.email = 'Email address is required'
}
if(!validator.isEmail(data.email)){
    error.email = 'Email is invalid'
}
if (validator.isEmpty(data.password)){
    error.password = 'password is required'
}
if (!validator.isLength(data.password, {min: 6, max:15})){
    error.password = 'password is too short'
}

return {
    error,
    isValid : isRequired(error)
}

} 
module.exports = validatFunction;