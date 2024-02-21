const db= require('../db')
const { Event,FamilyProfile,UserProfile } = require('../models')

db.on('error',console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

const users_p = await UserProfile.find({})
// console.log(users_p[0])
const families_p = await FamilyProfile.find({})
// console.log(families_p[0])



    const user_profile = await Event.find({})

    const events = [
        {
            event_name : "Nayanii's 6th Birthday",
            due_date: "2024-07-01",
            description: "Ita suprice bday party",
            completed:false,
            cost_estimation: 2000,
            weather_condition: "sunny as per weather API",
            specialday_Note: "Canadata Day (public holiday) falles on monday as per Holiday API",
            Special_notes: "Her Bday is June 25th",
            invite_families_id: [families_p[1],families_p[0],families_p[2]],
            user_id: users_p[0]
        },
        {
            event_name : "Bavi's 6th Birthday",
            due_date: "2024-10-04",
            description: "Ita suprice bday party",
            completed:false,
            cost_estimation: 4000,
            weather_condition: "sunny as per weather API",
            specialday_Note: " (public October 04th",
            invite_families_id: [families_p[1],families_p[0],families_p[2]],
            user_id: users_p[0]
        },
        {
            event_name : "Nayanii's 6th Birthday",
            due_date: "2025-07-01",
            description: "Ita suprice bday party",
            completed:false,
            cost_estimation: 2000,
            weather_condition: "sunny as per weather API",
            specialday_Note: "Canadata Day (public holiday) falles on monday as per Holiday API",
            Special_notes: "Her Bday is June 25th",
            invite_families_id: [families_p[1],families_p[0],families_p[2]],
            user_id: users_p[0]
        },
        {
            event_name : "Nayanii's 5th Birthday",
            due_date: "2023-07-01",
            description: "Ita suprice bday party",
            completed:true,
            cost_estimation: 1000,
            weather_condition: "sunny as per weather API",
            specialday_Note: "Canadata Day (public holiday) falles on monday as per Holiday API",
            Special_notes: "Her Bday is June 25th",
            invite_families_id: [families_p[1],families_p[0],families_p[2]],
            user_id: users_p[0]
        }
    ]

    await Event.insertMany(events) 
    console.log("Events are Created sucessfully")
}

const run = async () => {

    await main()
    db.close()

}

run()

