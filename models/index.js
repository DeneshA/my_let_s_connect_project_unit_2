const mongoose = require('mongoose')
const userProfileSchema = require('./userProfile')
const familyProfileSchema = require('./familyProfile')

// UserProfile is refereing the table name of the DB
const UserProfile = mongoose.model('UserProfile',userProfileSchema)
const FamilyProfile = mongoose.model('FamilyProfile',familyProfileSchema)

module.exports = {

    UserProfile,
    FamilyProfile

}