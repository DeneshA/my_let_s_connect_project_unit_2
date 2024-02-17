const mongoose = require('mongoose')
const userProfileSchema = require('./userProfile')

// UserProfile is refereing the table name of the DB
const UserProfile = mongoose.model('UserProfile',userProfileSchema)

module.exports = {

    UserProfile

}