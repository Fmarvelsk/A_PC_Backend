const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var accessorSchema = new Schema({
    
    Accessorname:{type:String, required : true},
    Accessoremail:{type:String, required : true},
    University: {type:String, required : true},
    Email:{type: String, required : true},
    Status: {
        type: String,
        enum: ['invitationsent', 'applicationsent','papersent','paperrecieved']
    },
    Date : {type : Date, default: Date.now}
})

const candidateSchema = new Schema(
    {
        Surname: {
            type : String,
            required : true},
        Othername: {
            type : String,
            required : true},
        Email :{
            type: String,
            required : true
        },
        Faculty: {
            type : String,
            required : true
        },
        Department: {
            type : String,
            required : true
        },
        Level : {
            type : String,
        },
        accessor: [accessorSchema]
        
    }
)
const candidate = mongoose.model('Candidate', candidateSchema)

module.exports = candidate;