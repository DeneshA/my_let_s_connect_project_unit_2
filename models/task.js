const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const taskSchema = new Schema (
    {
        task_name: {type: String, required: true},
        cost : {type: Number, required: false},
        task_due_date: {type: Date, default: Date.now()},
        task_completed: {type: Boolean},
        notes :{type: String, required: false},
        event_id :{type: Schema.Types.ObjectId, ref:'event'},
        user_id :{type: Schema.Types.ObjectId, ref:'userProfile'}

    },
    {
        timestamps:true
    }
)

module.exports = taskSchema