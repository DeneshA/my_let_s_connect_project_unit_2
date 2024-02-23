const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const eventSchema = new Schema (
    {
        event_name : {type: String, required: true},
        due_date: {type: Date,default: Date.now()},
        description: {type:String, required: false},
        completed:{type: Boolean,default: true},
        cost_estimation: {type: Number,required: false},
        weather_condition: {type: String,required: false},
        // specialday_Note: {type:String,required:false},
        // special_notes: {type:String,require:false},
        invite_families_id: [{type:Schema.Types.ObjectId, ref:'familyProfile'}],
        user_id: {type:Schema.Types.ObjectId, ref:'userProfile'},
        address_id: {type:Schema.Types.ObjectId, ref:'address'},
    },
    {
        timestamps: true
    }

)

module.exports = eventSchema