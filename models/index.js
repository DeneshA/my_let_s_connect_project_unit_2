const mongoose = require('mongoose')
const userProfileSchema = require('./userProfile')
const familyProfileSchema = require('./familyProfile')
const addressSchema = require('./address')
const eventSchema = require('./event')
const taskSchema = require('./task')

// UserProfile is refereing the table name of the DB
const UserProfile = mongoose.model('UserProfile',userProfileSchema)
const FamilyProfile = mongoose.model('FamilyProfile',familyProfileSchema)
const Address = mongoose.model('Address',addressSchema)
const Event = mongoose.model('Event',eventSchema)
const Task = mongoose.model('Task',taskSchema)

module.exports = {

    UserProfile,
    FamilyProfile,
    Address,
    Event,
    Task

}