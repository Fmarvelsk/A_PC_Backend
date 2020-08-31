const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfo = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minlength : 6
    },
    password :{
        type : String,
        required : true,
        unique : true,
        minlength : 6
    },
    email : {
        type : String,
        minlength : 10
    },
    googleID: {
        String
    },

    image: {
        String
    }
}, {
    timestamps: true
})
const user = mongoose.model('user', userInfo)

module.exports = user;