//Declare Web Element
let type= document.querySelector('#type')
let unit_no = document.querySelector('#unit-no')
let street_name_1 = document.querySelector('#street-name-1')
let street_name_2 = document.querySelector('#street-name-2')
let city =document.querySelector('#city')
let provience = document.querySelector('#provience')
let country = document.querySelector('#country_a')
let country_code = document.querySelector('#country-code')
let postal_code = document.querySelector('#postal-code')
let alert_msg = document.querySelector('#alert-msg')


//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')

let current_address_UID =""
clear_btn.addEventListener('click', () => {
    call_clear()
})
//http://localhost:3001/addresses/address?unit_no=45&street_name=Littet Ilford Lane
async function call_clear (){
            type.value = ""
            unit_no.value = ""
            street_name_1.value = ""
            street_name_2.value = ""
            city.value = ""
            provience.value = ""
            country.value = ""
            country_code.value = ""
            postal_code.value = ""
            current_address_UID = ""
}


street_name_1.addEventListener('change', () => {
    if(unit_no.value==="") 
    {
       window.alert("Please fill the unit no to fetch an address")
    }else{
        getAddress()
    }
    
    

})

async function getAddress () {
    try{
        if(!unit_no.value || !street_name_1){
            throw new Error("Both unit no and stret name should be presented to searh an address",error)
        }
            let response  = await axios.get(`http://localhost:3001/addresses/address?unit_no=${unit_no.value}&street_name=${street_name_1.value}`)
            // let response  = await axios.get(`http://localhost:3001/addresses/address?unit_no=45&street_name=Littet Ilford Lane`)
            console.log(response)
        if(response){
            type.value = response.data.type
            unit_no.value = response.data.unit_no
            street_name_1.value = response.data.street_name_1
            street_name_2.value = response.data.street_name_2
            city.value = response.data.city
            provience.value = response.data.province
            country.value = response.data.country
            country_code.value = response.data.country_code
            postal_code.value = response.data.postal_code
            current_address_UID = response.data._id
            // console.log(current_address_UID)
        }
        throw new  Error("There are no address found in the system ",error.message)

    }catch(error)
    {
        throw new Error("Error loading adress information:", error.message)
    }
}


submit_btn.addEventListener('click', () => {
    if(!type.value || !unit_no.value || !street_name_1.value || !city.value || !provience.value || !country.value || !postal_code)
    {
        alert_msg.innerHTML = `<h4>Except 2nd Street name & Country code all the other fields are mandetory to Submit</h4>`
        
    }else{
    create_address()
    }
})

async function create_address (){
    try{
    //validation
    let data_file = {
        "type":type.value,
        "unit_no":unit_no.value,
        "street_name_1":street_name_1.value,
        "street_name_2":street_name_2.value,
        "city": city.value,
        "province": provience.value,
        "country":country.value,
        "country_code":country_code.value,
        "postal_code":postal_code.value
        }
        let  response = await axios.post('http://localhost:3001/addresses',data_file)
        if(response){
                    
            alert_msg.innerHTML = `<h4>Address Created Successfully</h4>`
        }else{
            alert_msg.innerHTML = `<h4>Unable to Create! Invalid address</h4>`
        }
    }
    catch(error)
    {
        throw new Error("Invalid address entered",error.message)
    }

}


update_btn.addEventListener('click', () => {
    if(!type.value || !unit_no.value || !street_name_1.value || !city.value || !provience.value || !country.value || !postal_code)
    {
        alert_msg.innerHTML = `<h4>Except 2nd Street name & Country code all the other fields are mandetory to Submit</h4>`
        
    }else{
    update_address()
    }
})

async function update_address(){
    try{
       
        let data_file = {
            "type":type.value,
            "unit_no":unit_no.value,
            "street_name_1":street_name_1.value,
            "street_name_2":street_name_2.value,
            "city": city.value,
            "province": provience.value,
            "country":country.value,
            "country_code":country_code.value,
            "postal_code":postal_code.value
            }
            if(!unit_no.value || !street_name_1 || !current_address_UID){
                throw new Error("Both unit no and stret name should be presented to searh an address",error)
            }
                let response  = await axios.get(`http://localhost:3001/addresses/address?unit_no=${unit_no.value}&street_name=${street_name_1.value}`)
                // let response  = await axios.get(`http://localhost:3001/addresses/address?unit_no=45&street_name=Littet Ilford Lane`)
                // console.log(response)
            if(response){
            //if user existing then update the user profile
            let  updateResponse = await axios.put(`http://localhost:3001/addresses/${response.data._id}`,data_file)
                    
                alert_msg.innerHTML = `<h4>Address Updated Successfully</h4>`
            }else{
                alert_msg.innerHTML = `<h4>Unable to Update! Invalid Address details</h4>`
            }
        }
    
    catch(error)
    {
        throw new Error("Error loading address:", error.message)
    }
}


delete_btn.addEventListener('click', () => {
    if(!type.value || !unit_no.value || !street_name_1.value || !city.value || !provience.value || !country.value || !postal_code)
    {
        alert_msg.innerHTML = `<h4>Except 2nd Street name & Country code all the other fields are mandetory to Submit</h4>`
        
    }else{
        delete_address()
    }
})

async function delete_address(){
    try{  
  
        // let  validate_existing_address = await axios.get(`http://localhost:3001/families/family?current_UID=${current_address_UID}`)
        // console.log(user_name.value)
        if(current_address_UID){
            //if user existing then delete the user profile
            // console.log("Existing user", validate_existing_user)
            let  response = await axios.delete(`http://localhost:3001/addresses/${current_address_UID}`)

            if(response){
                    
                alert_msg.innerHTML = `<h4>Address Deleted Successfully</h4>`
            }else{
                alert_msg.innerHTML = `<h4>Unable to Delete! Invalid address details</h4>`
            }
        }
    }
    catch(error)
    {
        throw new Error("Error loading address:", error.message)
    }
}

//// Adding master button event
let user_icon =document.querySelector('#user')
let family_icon =document.querySelector('#family')
let address_icon =document.querySelector('#address')
let home_icon =document.querySelector('#home')
let event_icon =document.querySelector('#event')
let task_icon =document.querySelector('#task')
let reminder_icon =document.querySelector('#reminder')

user_icon.addEventListener ('click', () => { window.location.href='userprofile.html'})
family_icon.addEventListener ('click', () => { window.location.href='familyProfile.html'})
address_icon.addEventListener ('click', () => { window.location.href='address.html'})
home_icon.addEventListener ('click', () => { window.location.href='index.html'})
event_icon.addEventListener ('click', () => { window.location.href='event.html'})
task_icon.addEventListener ('click', () => { window.location.href='assignment.html'})
reminder_icon.addEventListener ('click', () => { window.location.href='index.html'})