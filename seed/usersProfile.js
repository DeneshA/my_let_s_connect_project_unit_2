const db = require('../db')
const { UserProfile } = require('../models')

db.on('error',console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    const users = [
        {
            user_name: "Denesh555",
            first_name: "Denesh",
            last_name: "Anan",
            email: "denesh555@gmail.com",
            contact: "+1-648-253-5868",
            dob:"1999-02-09"
            // address:"",
            // family_id: "",
    
        }
    ]

    await UserProfile.insertMany(users)
    console.log('User sucessfully inserted !')

}

const run = async () => {

    await main()
    db.close()

}

run()