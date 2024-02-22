const db = require('../db')
const { Task } = require('../models')

const getAllTaskByEventId = async (request,response) =>{
    try{
        const { id } = request.params
        const tasks_by_event = await Task.find({event_id: id})
        return response.json(tasks_by_event)

    }catch(error)
    {
        return response.status(500).send(error.message)
    }

}


const createTask = async (request,response) => {
    try{
        const new_task = await new Task (request.body)
        await new_task.save()
        return response.status(201).json({new_task})
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}


const updateTask = async (request,response) => {
    try{
        let {id} = request.params
        let update_task = await Task.findByIdAndUpdate(id,request.body,{new:true})
        return response.status(200).json(update_task)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}


const deleteTask = async (request,response) => {
    try{
        let {id} = request.params
        
        let deleted = await Task.findByIdAndDelete(id)
        
        if(deleted){
            return response.status(200).send("Task Deleted")
        }
        throw new Error("Task not found!")
    }catch(error){
        return response.status(500).send(error.message)
    }
}


module.exports ={

    getAllTaskByEventId,
    createTask,
    updateTask,
    deleteTask
    
}