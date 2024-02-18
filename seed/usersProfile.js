const db = require('../db')
const { UserProfile,Address,FamilyProfile} = require('../models')

db.on('error',console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    const ad = await Address.findOne({_id:'65d23f8d2fd424b3a856be3d'})
    console.log(ad)
    const fa = await FamilyProfile.findOne({_id:'65d24928fb0fb11d2b959eba'})
    console.log(ad)
    const users = [
        // {
        //     user_name: "Denesh555",
        //     password: "denesh555",
        //     first_name: "Denesh",
        //     last_name: "Anan",
        //     email: "denesh555@gmail.com",
        //     contact: "+1-648-253-5868",
        //     dob:"1999-02-09",
        //     gender:"Male",
        //     image:"https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
        //     address:"",
        //     family_id:""
    
        // },
        // {
        //     user_name: "Prathap555",
        //     password: "prathap555",
        //     first_name: "Prathap",
        //     last_name: "Ratna",
        //     email: "prathap555@gmail.com",
        //     contact: "+1-648-253-5868",
        //     dob:"1999-02-09",
        //     gender:"Male",
        //     image:"https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
        //     address:"",
        //     family_id:""
    
        // },
        //   {
        //     user_name: "Bavi555",
        //     password: "bavi555",
        //     first_name: "Ananthini",
        //     last_name: "Manoharan",
        //     email: "ananthini555@gmail.com",
        //     contact: "+1-648-253-5868",
        //     dob:"2006-02-09",
        //     gender:"Female",
        //     image:"https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
        //     address:"",
        //     family_id:""
    
        // },
        {
            user_name: "Testt555",
            password: "test555",
            first_name: "Testing",
            last_name: "Test",
            email: "test555@gmail.com",
            contact: "+1-648-253-5868",
            dob:"2006-02-09",
            gender:"Female",
            image:"https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
            address_id:ad._id,
            family_id:fa._id
    
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