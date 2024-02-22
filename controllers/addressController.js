const { Address } = require('../models')

const getAlladdress = async (request,response) => {
    try{
        const address = await Address.find({})
        response.json(address)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

const getAlladdressById = async (request,response) => {
    try{
        const { id } = request.params
        const address = await Address.findById(id)
        response.json(address)
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
}

const createAddress = async (request,response) => {
    try{
       
        const address = await new Address(request.body)
        await address.save()
        if(address){
            return response.status(201).json({address})
        }
        return response.status(201).json({address})

    }catch(error){

        return response.status(500).json({error: error.message})

    }

}


const updateAddress = async (request,response) => {
    try{
        let { id } = request.params
        let update_Address = await Address.findByIdAndUpdate(id, request.body, {new: true})
        if(update_Address){
            return response.status(200).json(update_Address)
        }
        throw new Error("Address not found !")
    }catch(error){

        return response.status(500).json({error: error.message})

    }

}


const deleteAddress = async (request,response) => {
    try{
        const { id } = request.params
        const deleted = await Address.findByIdAndDelete(id)
        if(deleted){
            return response.status(200).send("Address deleted")
        }
        throw new Error("Address not found !")
    }catch(error)
    {
        return response.status(500).send(error.message)
    }
} 

const get_an_Address_by_unit_and_street_name = async (request,response) => {
try
   { const unit_no_r = request.query.unit_no
    const street_name_1_r = request.query.street_name

    const address_info = await Address.findOne({unit_no: unit_no_r,street_name_1:street_name_1_r})
    console.log(address_info)
    if(address_info){
        return response.status(200).json(address_info)
    }
    throw new Error("Addres is not found for this unit no. and street name",error.message)
}
catch(error){
    return response.status(500).send(error.message)
}
}

module.exports = {

    getAlladdress,
    createAddress,
    updateAddress,
    deleteAddress,
    get_an_Address_by_unit_and_street_name,
    getAlladdressById

}