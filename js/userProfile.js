
// Web Elements 
let first_name = document.querySelector('#first-name')
let last_name = document.querySelector('#last-name')
let user_name = document.querySelector('#user-name')
let password_u = document.querySelector('#password')
let email = document.querySelector('#email')
let gender = document.querySelector('#gender')
let dob = document.querySelector('#dob')
let contact = document.querySelector('#contact')
let address = document.querySelector('#address')
let family_code = document.querySelector('#family-code')
let image = document.querySelector('#image')
let user_image= document.querySelector('.user-image')
let username_header = document.querySelector('#username-header')
let address_list = document.querySelector('#address-list')
let family_list = document.querySelector('#family-list')
let alert_msg = document.querySelector('#alert-msg')

//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')



//Store the current user
let userResponse
let current_UName 
let User_UID
let current_address =""

load_all_address()
load_all_family_profile()

window.onload = () => {
    // load_current_user_profile()    
}
clear_btn.addEventListener('click', () => {
    clear()
})

async function clear(){
    first_name.value = ""
    last_name.value = ""
    user_name.value =""
    password_u.value=""
    email.value =""
    gender.value =""
    dob.value = ""
    contact.value =""
    address_list.value =""
    family_list.value=""
    image.value =""
    userResponse=""
    current_UName=""
    User_UID=""
    current_address=""
    load_all_address()
    load_all_family_profile()
}

//load all the Family Profile
async function load_all_family_profile(){
    try{
        let familyResponse = await axios.get('http://localhost:3001/families')
        // console.log(familyResponse.data.length)
        if (familyResponse)
        {
            for(let i=0;i<familyResponse.data.length;i++ )
            {
                let optionalElement = document.createElement('option')
                //console.log(` Name : ${listOfCodes_n_Countries[0][i].name} Code : ${listOfCodes_n_Countries[0][i].countryCode}  `)
                optionalElement.value =`${familyResponse.data[i]._id}`
                optionalElement.text =`${familyResponse.data[i].family_name} - ${familyResponse.data[i].family_code}`
                family_list.appendChild(optionalElement)
            }
        }
    }
    catch(error)
    {
        throw new Error("Unable to load Address file",error.message)
    }
    
    }
    


user_name.addEventListener('change', () => {
    load_current_user_profile()
})


//load address in to ti drop down
async function load_all_address(){
try{
    let addressResponse = await axios.get('http://localhost:3001/addresses')
    // console.log(addressResponse.data.length)
    if (addressResponse)
    {
        for(let i=0;i<addressResponse.data.length;i++ )
        {
            let optionalElement = document.createElement('option')
            //console.log(` Name : ${listOfCodes_n_Countries[0][i].name} Code : ${listOfCodes_n_Countries[0][i].countryCode}  `)
            optionalElement.value =`${addressResponse.data[i]._id}`
            optionalElement.text =`${addressResponse.data[i].unit_no}, ${addressResponse.data[i].street_name_1}, ${addressResponse.data[i].city}, ${addressResponse.data[i].province}`
            address_list.appendChild(optionalElement)
        }
    }
}
catch(error)
{
    throw new Error("Unable to load Address file",error.message)
}

}

// To load currenct user profile details
async function load_current_user_profile(){
    try{
        userResponse = await axios.get(`http://localhost:3001/users/current/user/${user_name.value}`)
        // current_user_profile_response = await axios.get(`http://localhost:3001/users/current/user/Denesh555`)
        //console.log(userResponse.data)
        first_name.value = userResponse.data.first_name
        last_name.value = userResponse.data.last_name
        user_name.value = userResponse.data.user_name
        password_u.value = userResponse.data.password
        email.value = userResponse.data.email
        gender.value = userResponse.data.gender
        dob.value = new Date(userResponse.data.dob).toLocaleDateString()
        contact.value = userResponse.data.contact
        load_all_address()
        address_list.value = userResponse.data.address_id
        load_all_family_profile()
        family_list.value = userResponse.data.family_id
        user_image.innerHTML =  `<img class="user-pic" src=${userResponse.data.image}>`
        image.value= userResponse.data.image
        username_header.innerHTML = "Welcome ! "+userResponse.data.first_name

    }
    catch(error)
    {
       throw new Error("Error loading user profile:", error.message)
    }
}

submit_btn.addEventListener ('click',() => {
    
    save_and_update_user_profile()

})


//SAve and Update User profile
async function save_and_update_user_profile(){
    try{
       
        let data_file = {"user_name": user_name.value,
        "password": password.value,
        "first_name": first_name.value,
        "last_name": last_name.value,
        "email": email.value,
        "contact": contact.value,
        "dob": dob.value,
        "gender": gender.value,
        "address_id": address_list.value,
        "family_id":family_list.value,
        "image":image.value
        }
        
        let  response = await axios.post('http://localhost:3001/users',data_file)
        if(response){
        
            alert_msg.innerHTML = `<h4>User profile created Successfully</h4>`
        }else{
            alert_msg.innerHTML = `<h4>Unable to Save! Invalid User profile</h4>`
        }
       
    }
    catch(error)
    {
        throw new Error("Error loading user profile:", error.message)
    }
}

//Update user profile
update_btn.addEventListener('click', () => {
    update_user_profile()
})

async function update_user_profile(){
    try{
       
        let data_file = {"user_name": user_name.value,
        "password": password.value,
        "first_name": first_name.value,
        "last_name": last_name.value,
        "email": email.value,
        "contact": contact.value,
        "dob": dob.value,
        "gender": gender.value,
        "address_id": address_list.value,
        "family_id":family_list.value,
        "image":image.value
        }      

        let validate_existing_user = await axios.get(`http://localhost:3001/users/current/user/${user_name.value}`)
        // console.log(user_name.value)
        // console.log(validate_existing_user)
        if(validate_existing_user){
            //if user existing then update the user profile
            let  response = await axios.put(`http://localhost:3001/users/${validate_existing_user.data._id}`,data_file)
            if(response){
        
                alert_msg.innerHTML = `<h4>User profile updated Successfully</h4>`
            }
            
        }else {
            //if not exist can register new user profile
            alert_msg.innerHTML = `<h4>Unable to update ! User profile not existing</h4>`
        }
    }
    catch(error)
    {
        throw new Error("Error loading user profile:", error.message)
    }
}

//Delete User profile
delete_btn.addEventListener('click', () => {
    if (!user_name)
    {
        console.log('The user name  is invalid or not existing in Db to operate delete funtion')
        throw new Error('The user name  is invalid or not existing in Db to operate delete funtion')
    }else {
    delete_user_profile()
    }
})


async function delete_user_profile(){
    try{  
  
        let validate_existing_user = await axios.get(`http://localhost:3001/users/current/user/${user_name.value}`)
        // console.log(user_name.value)
        if(validate_existing_user.data._id){
            //if user existing then delete the user profile
            console.log("Existing user", validate_existing_user)
            let  response = await axios.delete(`http://localhost:3001/users/${validate_existing_user.data._id}`)

            if(response){
        
                alert_msg.innerHTML = `<h4>User profile Deteted Successfully</h4>`
            }
            
        }else {
            //if not exist can register new user profile
            alert_msg.innerHTML = `<h4>Unable to Delete ! User profile not existing</h4>`
        }
    }
    catch(error)
    {
        throw new Error("Error loading user profile:", error.message)
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

