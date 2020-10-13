const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var accessorSchema = new Schema({
    
    fullname:{type:String, required : true},
    university: {type:String, required : true},
    email:{type: String, required : true},
    //status : {
        //type: "String"
   // enum:["papersent", "paperaccepted", "invitationsent", "invitationrecevied" ] }
    date : {type : Date, default: Date.now}
})

const candidateSchema = new Schema(
    {
        surname: {
            type : String,
            required : true},
        othername: {
            type : String,
            required : true},
        email :{
            type: String,
            required : true
        },
        faculty: {
            type : String,
            required : true
        },
        department: {
            type : String,
            required : true
        },
        level : {
            type : String,
        },
    accessor:[accessorSchema]
    },
    {
        timestamps:true
    }    
)
const candidate = mongoose.model('Candidate', candidateSchema)

module.exports = candidate;