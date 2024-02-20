// const { response } = require("express")

// Declar Web Element
let family_name = document.querySelector('#family-name')
let family_code =  document.querySelector('#family-code')
let anniversary = document.querySelector('#anniversary')
let user_name = document.querySelector('#user-name')
let full_Name = document.querySelector('#full-name')
let relationship = document.querySelector('#relationship')
let alert_msg = document.querySelector('#alert-msg')
let family_table = document.querySelector('.family-table')

//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')

let Current_UID =''

family_code.addEventListener('change', () => {

    load_current_family_profile_by_Family_Code()

})
clear_btn.addEventListener('click', () => {
    call_clear()
})

async function call_clear(){
    family_name.value = ""
    family_code.value = ""
    anniversary.value = ""
    user_name.value = ""
    full_Name.value = ""
    relationship.value = ""
    family_table.innerHTML = ""

}

async function load_current_family_profile_by_Family_Code (){
    try{
        let familyResponse = await axios.get(`http://localhost:3001/families/family/code/${family_code.value}`)
        // console.log(familyResponse)
        family_name.value = familyResponse.data[0].family_name
        family_code.value = familyResponse.data[0].family_code
        anniversary.value = new Date(familyResponse.data[0].anniversary).toLocaleDateString()
        let list_of_family_menbers = familyResponse.data
        if (list_of_family_menbers.length > 0)
        {
            create_Dynamic_Table(['User Name', 'Full Name', 'Relationship'],list_of_family_menbers,family_table)
        }
    }catch(error)
    {
        throw new Error("Error loading user profile:", error.message)
    }
}


//Creating Dunamic Table for listing all the family members
async function create_Dynamic_Table(table_Header,tableData,getElement){
    //Table Header
try{
    //Create table element
    const dynamic_Table = document.createElement('table')
    //const dynamic_Table = document.querySelector('.border-table')

    //Create table row element
    const dynamic_TH_Row = document.createElement('tr')

    //Adding table header
    for (let i=0;i<table_Header.length;i++){
         //Create table header element
        const dynamic_T_Header = document.createElement('th')

        dynamic_T_Header.textContent = table_Header[i]
        dynamic_TH_Row.appendChild(dynamic_T_Header)
    }
   dynamic_Table.appendChild(dynamic_TH_Row)

   //Create rows with data
   for(let j=0;j<tableData.length;j++){
    //console.log(`Table length : ${tableData.length}`)
        const t_row = document.createElement('tr')

            let userResponse = await axios.get(`http://localhost:3001/users/user/${tableData[j].user_id}`)      
            // console.log(userResponse.data)      
            const table_data_1 = document.createElement('td')
            table_data_1.textContent = userResponse.data.user_name
            t_row.appendChild(table_data_1) 

            
            const table_data_2 = document.createElement('td')           
            table_data_2.textContent = `${userResponse.data.first_name} ${userResponse.data.last_name}`
            t_row.appendChild(table_data_2)

            const table_data_3 = document.createElement('td')
            table_data_3.textContent = tableData[j].relationship
            t_row.appendChild(table_data_3)

        dynamic_Table.appendChild(t_row)
   }

    //dynamic_Table.setAttribute('class','border-table')
    // document.querySelector(getElement).appendChild(dynamic_Table)
    family_table.appendChild(dynamic_Table)
}
catch (error){
    console.log(`Found an error :  ${error}`)
}

}

user_name.addEventListener('change', () => {
    findUserByUserName()
})
async function findUserByUserName() {
    try{
        let userResponse = await axios.get(`http://localhost:3001/users/current/user/${user_name.value}`)
        // console.log(userResponse.data)
        if(userResponse){
            full_Name.value = `${userResponse.data.first_name} ${userResponse.data.last_name}`
            Current_UID = userResponse.data._id
            // console.log(Current_UID)
        }
        throw new Error('Unable to find the User ',error.message)
    }catch(error)
    {
        throw new Error("Invalid user information",error.message)
    }
}

submit_btn.addEventListener('click', () => {
    if(!family_name.value || !family_code.value || !anniversary.value || !user_name.value || !relationship.value)
    {
        alert_msg.innerHTML = `<h4>Except Relationship all the other fields are mandetory to Submit</h4>`
        
    }else{
        create_family_members()
    }
})

async function create_family_members (){
    try{
    //validation

        let data_file = {
                        "family_name": family_name.value,
                        "family_code": family_code.value,
                        "anniversary": anniversary.value,
                        "relationship": relationship.value,
                        "user_id": Current_UID
                        }

        let  response = await axios.post('http://localhost:3001/families',data_file)

        //Need to update User profile on Family Id
        // let user_data_file = {}
        // let userResponse = await axios.put(`http://localhost:3001/users/${Current_UID}`,)

        if(response){
        
            alert_msg.innerHTML = `<h4>Family profile created Successfully</h4>`
        }else{
            alert_msg.innerHTML = `<h4>Unable to Save! Invalid Family profile</h4>`
        }
    }
    catch(error)
    {
        throw new Error("Invalid family profile",error.message)
    }

}

update_btn.addEventListener('click', () => {
    if(!family_name.value || !family_code.value || !anniversary.value || !user_name.value || !relationship.value)
    {
        alert_msg.innerHTML = `<h4>Except Relationship all the other fields are mandetory to Submit</h4>`
        
    }else{
    update_family_profile()
    }
})

async function update_family_profile(){
    try{
       
       let data_file = {
                        "family_name": family_name.value,
                        "family_code": family_code.value,
                        "anniversary": anniversary.value,
                        "relationship": relationship.value,
                        "user_id": Current_UID
                        }

        //let  validate_existing_family = await axios.get(`http://localhost:3001/families/family/?family_code=${family_code.value}&current_UID=${Current_UID}`)
        let  validate_existing_family = await axios.get(`http://localhost:3001/families/family?current_UID=${Current_UID}`)

        // console.log(validate_existing_family)
        // console.log(Current_UID)
   
        if(validate_existing_family){
            //if user existing then update the user profile
            let  response = await axios.put(`http://localhost:3001/families/${validate_existing_family.data._id}`,data_file)
//   //Need to update User profile on Family Id (But noe  mandertory)
            if(response){
                    
                alert_msg.innerHTML = `<h4>Family profile Updated Successfully</h4>`
            }else{
                alert_msg.innerHTML = `<h4>Unable to Update! Invalid Family profile</h4>`
            }
        }
    }
    catch(error)
    {
       throw new Error("Error loading family profile:", error.message)
    }
}

delete_btn.addEventListener('click', () => {
    if(!family_name.value || !family_code.value || !anniversary.value || !user_name.value || !relationship.value)
    {
        alert_msg.innerHTML = `<h4>Except Relationship all the other fields are mandetory to Submit</h4>`
        
    }else{
    delete_family_profile()
    }
})

async function delete_family_profile(){
    try{  
  
        let  validate_existing_family = await axios.get(`http://localhost:3001/families/family?current_UID=${Current_UID}`)
        // console.log(user_name.value)
        if(validate_existing_family){
            //if user existing then delete the user profile
            // console.log("Existing user", validate_existing_user)
            let  response = await axios.delete(`http://localhost:3001/families/${validate_existing_family.data._id}`)

            if(response){
                    
                alert_msg.innerHTML = `<h4>Family profile Deleted Successfully</h4>`
            }else{
                alert_msg.innerHTML = `<h4>Unable to Delete! Invalid Family profile</h4>`
            }
        }
    }
    catch(error)
    {
        throw new Error("Error loading family profile:", error.message)
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