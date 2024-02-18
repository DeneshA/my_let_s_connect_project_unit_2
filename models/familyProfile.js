const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const familyProfileSchema = new Schema(
    {
        family_name: { type: String, required: true },
        family_code: {type: String,required: true},
        anniversary:{type: Date,default: Date.now},
        relationship: {type: String,required: true},
        user_id: {type:Schema.Types.ObjectId, ref:'user'}
    },
    {
        timestamps:true
    }
)

module.exports =  familyProfileSchema