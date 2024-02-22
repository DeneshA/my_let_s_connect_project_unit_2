const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userProfileSchema = new Schema(
    {
        user_name: { type: String, required: true },
        password: {type: String, required: true },
        first_name: {type: String,required: true},
        last_name: {type: String,required: true},
        email: {type: String,required:false},
        contact:{type:String,required:false},
        dob:{type: Date,default: Date.now},
        contact:{type:String, required: false}, 
        gender:{type:String,required:false},
        image:{type:String,required:false},
        // address_id:{type:Schema.Types.ObjectId, ref:'address',default:null},
        // family_id: {type:Schema.Types.ObjectId, ref:'familyProfile',default:null},
    },
    {
        timestamps:true
    }
)

module.exports =  userProfileSchema