const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userProfileSchema = new Schema(
    {
        user_name: { type: String, required: true },
        first_name: {type: String,required: true},
        last_name: {type: String,required: true},
        email: {type: String,required:false},
        contact:{type:String,required:false},
        dob:{type: Date,default: Date.now}
        // address:{type:Schema.Types.ObjectId, ref:'address'},
        // family_id: {type:Schema.Types.ObjectId, ref:'family'},

    },
    {
        timestamps:true
    }
)

module.exports =  userProfileSchema