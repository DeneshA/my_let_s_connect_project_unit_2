//Declare Web Element
let event_name = document.querySelector('#event-name') 
let due_date = document.querySelector('#due-date')
let description = document.querySelector('#description')
let is_completed = document.querySelector('#is-completed')
let cost_estimation = document.querySelector('#cost-estimation')
let weather_condition = document.querySelector('#weather-condition')
let specialday_note = document.querySelector('#specialday-note')
let special_notes = document.querySelector('#special-notes')
let invite_families_id = document.querySelector('#invite-families-id')
let event_list = document.querySelector('#event-list')
let list_members = document.querySelector('#list-members')
let alert_msg = document.querySelector('#alert-msg')

//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')
let add_member = document.querySelector('#add-member')
let remove_member = document.querySelector('#remove-member')

//Array List
let families_array_list = []
let families_array_list_name = []
let current_user_id = "65d23e112fd424b3a856be2e"
let currenct_event_UID = "" 

load_all_family_profile_members()
Load_all_events_by_user_id()

clear_btn.addEventListener('click', () => {
    call_clear()
})

async function call_clear (){
    event_name.value = ""
    due_date.value = ""
    description.value = ""
    is_completed.value = ""
    cost_estimation.value = ""
    weather_condition.value = ""
    specialday_note.value = ""
    special_notes.value = ""
    // current_address_UID = ""
    load_all_family_profile_members()
    current_user_id = ""
    families_array_list = []
    let families_array_list_name = []
    currenct_event_UID = ""
    load_all_family_profile_members()
    Load_all_events_by_user_id()
    alert_msg.innerHTML = ""

}
async function Load_all_events_by_user_id(){
    try{
        let eventResponse = await axios.get(`http://localhost:3001/events/user/65d23e112fd424b3a856be2e`)
        console.log(eventResponse)
        if (eventResponse)
        {
            for(let i=0;i<eventResponse.data.length;i++ )
            {
                let optionalElement = document.createElement('option')
                //console.log(` Name : ${listOfCodes_n_Countries[0][i].name} Code : ${listOfCodes_n_Countries[0][i].countryCode}  `)
                optionalElement.value =`${eventResponse.data[i]._id}`
                optionalElement.text =`${eventResponse.data[i].event_name}, ${new Date(eventResponse.data[i].due_date).toLocaleDateString()}`
                event_list.appendChild(optionalElement)
            }
        }
    }
    catch(error){
        throw new Error("Error loading events",error.message)    
    }


}

submit_btn.addEventListener('click', () => {
    if(!event_name.value || !due_date.value || !is_completed)
    {
        alert_msg.innerHTML = `<h4>EEvent name, Due dates  & Completed are mandetory fields to Submit</h4>`
        
    }else{
    create_Event()
    }
})

add_member.addEventListener('click', () => {
    
    if(!families_array_list.includes(invite_families_id.value))
    {
        families_array_list.push(invite_families_id.value)
        families_array_list_name.push(invite_families_id.innerHTML)
        console.log(families_array_list ,families_array_list_name)
    }
    
})

remove_member.addEventListener('click', () => {
    
    if(families_array_list.includes(invite_families_id.value))
    {
        families_array_list.push(invite_families_id.value)
        families_array_list_name.push(invite_families_id.innerHTML)
        // console.log(families_array_list ,families_array_list_name)
    }
    
})


async function create_Event(){
    try{
        // validation
        let data_file = {
            "event_name":event_name.value,
            "due_date":due_date.value,
            "description":description.value,
            "completed":is_completed.value,
            "cost_estimation": cost_estimation.value,
            "weather_condition": weather_condition.value,
            "specialday_note":specialday_note.value,
            "special_notes":special_notes.value,
            "invite_families_id":families_array_list,
            "user_id": current_user_id
            }
            let  response = await axios.post('http://localhost:3001/events',data_file)
            if(response){
                        
                alert_msg.innerHTML = `<h4>Event Created Successfully</h4>`
            }else{
                alert_msg.innerHTML = `<h4>Unable to Create! Invalid event details</h4>`
            }
        }
        catch(error)
        {
            throw new Error("Invalid events details entered",error.message)
        }
    

}

async function load_all_family_profile_members(){
    try{
        let familyResponse = await axios.get(`http://localhost:3001/families`)
        // console.log(familyResponse.data)
        if (familyResponse)
        {
            for(let i=0;i<familyResponse.data.length;i++ )
            {
                let optionalElement = document.createElement('option')
                //console.log(` Name : ${listOfCodes_n_Countries[0][i].name} Code : ${listOfCodes_n_Countries[0][i].countryCode}  `)
                optionalElement.value =`${familyResponse.data[i]._id}`
                optionalElement.text =`${familyResponse.data[i].family_name}, ${familyResponse.data[i].family_code}`
                invite_families_id.appendChild(optionalElement)
            }
        }
    }catch(error)
    {
        throw new Error("Error loading family profile:", error.message)
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

event_list.addEventListener('change', () => {
    featch_event_detail_by_id()
})

async function featch_event_detail_by_id() {
    try{
        let eventResponse = await axios.get(`http://localhost:3001/events/${event_list.value}`)

        event_name.value = eventResponse.data.event_name
        due_date.value = eventResponse.data.due_date
        description.value = eventResponse.data.description
        is_completed.value = eventResponse.data.is_completed
        cost_estimation.value = eventResponse.data.cost_estimation
        weather_condition.value = eventResponse.data.weather_condition
        specialday_note.value = eventResponse.data.specialday_note
        special_notes.value = eventResponse.data.special_notes
        current_user_id = eventResponse.data.user_id
        families_array_list = eventResponse.data.invite_families_id
        currenct_event_UID = eventResponse.data._id
        
    }catch(error){
        throw new Error("Invalid Event search",error.message)
    }


}


update_btn.addEventListener('click', () => {
    if(!event_name.value || !due_date.value || !is_completed)
    {
        alert_msg.innerHTML = `<h4>EEvent name, Due dates  & Completed are mandetory fields to Submit</h4>`
        
    }else{
    update_Event()
    }
})

async function update_Event(){
    try{
       
        let data_file = {
            "event_name":event_name.value,
            "due_date":due_date.value,
            "description":description.value,
            "completed":is_completed.value,
            "cost_estimation": cost_estimation.value,
            "weather_condition": weather_condition.value,
            "specialday_note":specialday_note.value,
            "special_notes":special_notes.value,
            "invite_families_id":families_array_list,
            "user_id": current_user_id
            }
            
            let eventResponse = await axios.get(`http://localhost:3001/events/${event_list.value}`)

        if(eventResponse){
            
            let  response = await axios.put(`http://localhost:3001/events/${currenct_event_UID}`,data_file)
            if(response){
                alert_msg.innerHTML = `<h4>Event Updated Successfully</h4>`
            }else{
                alert_msg.innerHTML = `<h4>Unable to Update! Invalid Event</h4>`
            }
            
        }
    }
    catch(error)
    {
       throw new Error("Error loading event details", error.message)
    }
}


delete_btn.addEventListener('click', () => {
    if(!event_name.value || !due_date.value || !is_completed)
    {
        alert_msg.innerHTML = `<h4>EEvent name, Due dates  & Completed are mandetory fields to Submit</h4>`
        
    }else{
    delete_family_profile()
    }
})

async function delete_family_profile(){
    try{  
  
        let eventResponse = await axios.get(`http://localhost:3001/events/${event_list.value}`)

        if(eventResponse){
            
            let  response = await axios.delete(`http://localhost:3001/events/${currenct_event_UID}`)
            if(response){
                alert_msg.innerHTML = `<h4>Event Deleted Successfully</h4>`
            }else{
                alert_msg.innerHTML = `<h4>Unable to Deleted! Invalid Event</h4>`
            }
            
        }
    }
    catch(error)
    {
       throw new Error("Error loading event details", error.message)
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