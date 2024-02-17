
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

//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')



//Store the current user
let userResponse
let current_UName 
let User_UID

window.onload = () => {
    // load_current_user_profile()
}

user_name.addEventListener('change', () => {
    load_current_user_profile()
})


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
        address.value = userResponse.data.address
        family_code.value = userResponse.data.family_code
        user_image.innerHTML =  `<img class="user-pic" src=${userResponse.data.image}>`
        image.value= userResponse.data.image
        username_header.innerHTML = "Welcome ! "+userResponse.data.first_name

    }
    catch(error)
    {
        console.error("Error loading user profile:", error)
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
        // "address": address.value,
        // "family_code":family_code.value,
        "image":image.value
        }

        let  response = await axios.post('http://localhost:3001/users',data_file)

        // console.log(response)
        console.log("User profile created Sucessffully")
    }
    catch(error)
    {
        console.error("Error loading user profile:", error.message)
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
        // "address": address.value,
        // "family_code":family_code.value,
        "image":image.value
        }      

        let validate_existing_user = await axios.get(`http://localhost:3001/users/current/user/${user_name.value}`)
        // console.log(user_name.value)
        // console.log(validate_existing_user)
        if(validate_existing_user){
            //if user existing then update the user profile
            console.log("Existing user id", validate_existing_user.data._id)
            let  response = await axios.put(`http://localhost:3001/users/${validate_existing_user.data._id}`,data_file)

            console.log(response)
            console.log("User profile updated Sucessffully")

        }else {
            //if not exist can register new user profile
            console.log('new User',validate_existing_user)
        }
    }
    catch(error)
    {
        console.error("Error loading user profile:", error.message)
    }
}

//Delete User profile
delete_btn.addEventListener('click', () => {

    delete_user_profile()

})


async function delete_user_profile(){
    try{  
        let validate_existing_user = await axios.get(`http://localhost:3001/users/current/user/${user_name.value}`)
        // console.log(user_name.value)
        if(validate_existing_user.data._id){
            //if user existing then delete the user profile
            console.log("Existing user", validate_existing_user)
            let  response = await axios.delete(`http://localhost:3001/users/${validate_existing_user.data._id}`)

            console.log(response)
            console.log("User profile Deleted Sucessffully")

        }else {
            //if not exist can register new user profile
            console.log('new User',validate_existing_user)
        }
    }
    catch(error)
    {
        console.error("Error loading user profile:", error.message)
    }
}