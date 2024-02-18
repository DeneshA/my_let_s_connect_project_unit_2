const { request, response } = require('express')
const { UserProfile } = require('../models')

const getAllUserProfile = async (request,response) => {
    try{
        // console.log("User profile === ",UserProfile)

        const usersProfile = await UserProfile.find({})
        response.json(usersProfile)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}



const createUserProfile = async (request,response) => {
    try{
        // console.log(request.body)
        // const userProfile = await new UserProfile.UserProfile.create(request.body)
        const userProfile = await new UserProfile(request.body)
        await userProfile.save()
        return response.status(201).json({userProfile})

    }catch(error){

        return response.status(500).json({error: error.message})

    }

}

const updateUserProfile = async (request,response) => {
    try{
        let { id } = request.params
        let update_userProfile = await UserProfile.findByIdAndUpdate(id, request.body, {new: true})
        if(update_userProfile){
            return response.status(200).json(update_userProfile)
        }
        throw new Error("User profile not found !")
    }catch(error){

        return response.status(500).json({error: error.message})

    }

}

const deleteUserProfile = async (request,response) => {
    try{
        const { id } = request.params
        const deleted = await UserProfile.findByIdAndDelete(id)
        if(deleted){
            return response.status(200).send("User profile deleted")
        }
        throw new Error("User profile not found !")
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
} 


const getDetailsByUserName = async (request,response) => {
    try{
        // console.log("User profile Details === ",UserProfile)
        let current_user_name = request.params.name
        // console.log(request.params.name)
        // console.log(current_user_name)
        const usersProfile = await UserProfile.findOne({user_name: current_user_name})
        response.json(usersProfile)

    }catch(error)
    {
        return response.status(500).send(error.message)
    }
   
   
}

//Get Full Name using id
const getFullNameById = async (request,response) => {
    try{
        // console.log("User profile === ",UserProfile)
        const {id} = request.params
       
        const usersProfile = await UserProfile.findById(id)
        return response.status(200).json(usersProfile)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

// const findUserByUserName = async (request,respose) => {
//     try{

//     }
//     catch(error)
//     {
//         return response.status(500).send(error.message)
//     }
// }

module.exports ={

    getAllUserProfile,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
    getDetailsByUserName,
    getFullNameById

}