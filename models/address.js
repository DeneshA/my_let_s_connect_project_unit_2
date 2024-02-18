const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const addressSchema = new Schema(
    {
        type: { type: String, required: true },
        unit_no: {type: String, required: true },
        street_name_1: {type: String,required: true},
        street_name_2: {type: String,required: false},
        city: {type: String,required:true},
        province:{type:String,required:true},
        country:{type:String, required: true},
        country_code:{type:String,required:false},
        postal_code:{type:String,required:true}
    },
    {
        timestamps:true
    }
)

module.exports =  addressSchema