const db= require('../db')
const { FamilyProfile,UserProfile } = require('../models')

db.on('error',console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const user_profile = await UserProfile.find({})

    const families = [
        {
            family_name: "Denesh Family",
            family_code: "Nayanii",
            anniversary:"2016-05-29",
            relationship: "Husband",
            user_id: user_profile[0]._id
        },
        {
            family_name: "Ferdinant Family",
            family_code: "Niru",
            anniversary:"2010-05-29",
            relationship: "Husband",
            user_id: user_profile[1]._id
        }

    ]

    await FamilyProfile.insertMany(families) 
    console.log("Families Created sucessfully")
}

const run = async () => {

    await main()
    db.close()

}

run()

