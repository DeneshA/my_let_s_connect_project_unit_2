const { response } = require('express')
const { FamilyProfile } = require('../models')

const gettAllFimilieProfile = async (request,response) => {
    try{
        const familiesProfile = await FamilyProfile.find({})
        return response.json(familiesProfile)

    }catch(error)
    {
        return response.status(500).send(error.message)
    }

}

const createFamilyProfile = async (request,response) => {
    try{
        const familyProfile = await new FamilyProfile (request.body)
        await familyProfile.save()
        return response.status(201).json({familyProfile})
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

const updateFamilyProfile = async (request,response) => {
    try{
        let {id} = request.params
        let familyProfile = await FamilyProfile.findByIdAndUpdate(id,request.body,{new:true})
        return response.status(200).json(familyProfile)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

const deletefamilyProfile = async (request,response) => {
    try{
        let {id} = request.params
        console.log(id)
        let deleted = await FamilyProfile.findByIdAndDelete(id)
        console.log("Deleter file",deleted)
        if(deleted){
            return response.status(200).send("Family Profile Deleted")
        }
        throw new Error("Family profile not found!")
    }catch(error){
        return response.status(500).send(error.message)
    }
}

const get_familY_infor_by_family_code = async (request,response) => {
    try{
        const family_code = request.params.name
        if(!family_code)
        {
            throw new Error("family_code is required parameters!")
        }
        // console.log(family_code)
        const family_info = await FamilyProfile.find({family_code:family_code})
        console.log(family_info)
        if(family_code){
            return response.status(200).json(family_info)
        }
        throw new Error("Unable to find family information of the family code")
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

const get_family_infor_by_code_and_UID = async (request,response) => {
   try{ 
    //const family_code = request.query.family_code
    const current_UID = request.query.current_UID
    if(!current_UID)
    {
        throw new Error("family_code and current_UID are required parameters!")
    }
    const  family_info = await FamilyProfile.findOne({user_id:current_UID})
    // const  family_info = await FamilyProfile.find({ family_code:family_code,current_UID:current_UID})
    // console.log(family_info)
    if(current_UID){
        return response.status(200).json(family_info)
    } else {
        throw new Error("Unable to find family information for the provided parameters")
    }}
    catch(error) {
        return response.status(500).send(error.message)
    }

}

module.exports = {

    gettAllFimilieProfile,
    createFamilyProfile,
    updateFamilyProfile,
    deletefamilyProfile,
    get_familY_infor_by_family_code,
    get_family_infor_by_code_and_UID

}