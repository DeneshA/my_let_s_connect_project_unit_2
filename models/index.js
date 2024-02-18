const mongoose = require('mongoose')
const userProfileSchema = require('./userProfile')
const familyProfileSchema = require('./familyProfile')
const addressSchema = require('./address')

// UserProfile is refereing the table name of the DB
const UserProfile = mongoose.model('UserProfile',userProfileSchema)
const FamilyProfile = mongoose.model('FamilyProfile',familyProfileSchema)
const Address = mongoose.model('Address',addressSchema)

module.exports = {

    UserProfile,
    FamilyProfile,
    Address

}