const validator = require('validator');
const isRequired = require('./isRequired')

const validatFunction = (data) => {

let error = {}

data.email = !isRequired(data.email) ? data.email :''
if(validator.isEmpty(data.email)){
    error.email = 'Email address is required'
}
if(!validator.isEmail(data.email)){
    error.email = 'Email is invalid'
}
return {
    error,
    isValid : isRequired(error)
}

} 
module.export = validatFunction;