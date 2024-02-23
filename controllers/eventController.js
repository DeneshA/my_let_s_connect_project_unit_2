const { Event } = require('../models')

//Get all Events
const getAllEvents = async (request,response) => {
    try{
        const all_events = await Event.find({})
        response.json(all_events)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

//Get all Events by id
const getAllEventsById = async (request,response) => {
    try{
        const { id } = request.params
        const all_events = await Event.findById(id)
        response.json(all_events)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}


//GEt all Events only Active or not compplted yet
const get_All_Active_events_by_user_id = async (request,response) => {
    try{
        const { id } = request.params
        const all_events = await Event.find({user_id:id})
        response.json(all_events)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

//GEt all Events only Active and not compplted yet by perticulat User_id
const get_All_Active_events = async (request,response) => {
    try{
        const all_events = await Event.find({})
        response.json(all_events)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

const createEvent = async (request,response) => {
    try{
       
        const event_plan = await new Event(request.body)
        await event_plan.save()
        if(event_plan){
            return response.status(201).json({event_plan})
        }
        return response.status(201).json({event_plan})

    }catch(error){

        return response.status(500).json({error: error.message})

    }

}

const updateEvent = async (request,response) => {
    try{
        let { id } = request.params
        let update_Event = await Event.findByIdAndUpdate(id, request.body, {new: true})
        if(update_Event){
            return response.status(200).json(update_Event)
        }
        throw new Error("Event not found !")
    }catch(error){

        return response.status(500).json({error: error.message})

    }

}


const deleteEvent = async (request,response) => {
    try{
        const { id } = request.params
        const deleted = await Event.findByIdAndDelete(id)
        if(deleted){
            return response.status(204).send("Event deleted")
        }
        throw new Error("Event not found !")
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
} 
//Reminder Sort events for next 3 month
const get_event_current_month = async (request,response) => {
    try{
        
        //today
        const currentDate = new Date()

        const currentDayofMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDay())

        const firstDayofNextMonth = new Date(currentDate.getFullYear(),currentDate.getMonth() + 3, 1)

        const all_event = await Event.find({due_date:{$gte:currentDayofMonth,$lt:firstDayofNextMonth}}).sort({due_date:1})

        if(all_event){
            return response.status(200).json(all_event)
        }
        throw new Error("No Event found for the current month !")
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
} 

module.exports = {

    getAllEvents,
    get_All_Active_events,
    createEvent,
    updateEvent,
    deleteEvent,
    get_All_Active_events_by_user_id,
    getAllEventsById,
    get_event_current_month

}