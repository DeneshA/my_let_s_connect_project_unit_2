//Declare Web Element
let event_name = document.querySelector('#event-name') 
let due_date = document.querySelector('#due-date')
let description = document.querySelector('#description')
let is_completed = document.querySelector('#is-completed')
let cost_estimation = document.querySelector('#cost-estimation')
let weather_condition = document.querySelector('#weather-condition')
let specialday_note = document.querySelector('#specialday-note')
let special_notes = document.querySelector('#special_notes')
let invite_families_id = document.querySelector('#invite-families-id')
let event_list = document.querySelector('#event-list')
let list_members = document.querySelector('#list-members')
let alert_msg = document.querySelector('#alert-msg')
let family_table = document.querySelector('.family-table')
let address_list = document.querySelector('#address-list')

//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')
let add_member = document.querySelector('#add-member')
let remove_member = document.querySelector('#remove-member')
let remove_all_member = document.querySelector('#remove-all-member')

//Array List
let families_array_list = []
let families_array_list_name = []
let current_user_id = "65d23e112fd424b3a856be2e"
let currenct_event_UID = "" 


//API Key
const apiKey = '83c1f2a80ab04d3ebc8141135242501'

load_all_family_profile_members()
Load_all_events_by_user_id()
load_all_address_list()
//get_weather_api()
Load_Event_reminder_alert()

clear_btn.addEventListener('click', () => {
    call_clear()
})

async function get_weather_api(){
    let input = "l6y0v9"
    let setDate = "2024-02-22"
    //let response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}&aqi=no`)
    let response = await axios.get(`http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${input}&dt=${setDate}`)
    //https://api.weatherapi.com/v1/future.json?q=l6y0v9&dt=2024-02-21
    console.log(response.data)
}

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
    load_all_address_list()
    alert_msg.innerHTML = ""
    address_list.value =""
    invite_families_id.value=""
    family_table.innerHTML=""
    Load_Event_reminder_alert()

}

async function load_all_address_list(){
    try{
        let addressResponse = await axios.get(`http://localhost:3001/addresses`)
        // console.log(eventResponse)
        if (addressResponse)
        {
            for(let i=0;i<addressResponse.data.length;i++ )
            {
                let optionalElement = document.createElement('option')
                //console.log(` Name : ${listOfCodes_n_Countries[0][i].name} Code : ${listOfCodes_n_Countries[0][i].countryCode}  `)
                optionalElement.value =`${addressResponse.data[i]._id}`
                optionalElement.text =`${addressResponse.data[i].type} | ${addressResponse.data[i].unit_no} | ${addressResponse.data[i].street_name_1}`
                address_list.appendChild(optionalElement)
            }
        }
    }
    catch(error){
        throw new Error("Error loading events",error.message)    
    }

}


async function Load_all_events_by_user_id(){
    try{
        let eventResponse = await axios.get(`http://localhost:3001/events/user/65d23e112fd424b3a856be2e`)
        // console.log(eventResponse)
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
        // console.log(families_array_list ,families_array_list_name)

        if (families_array_list.length > 0)
        {
            family_table.innerHTML=""
            create_Dynamic_Table(['Family Name', 'Family Code'],families_array_list,family_table)
        }
    }
    
})

remove_all_member.addEventListener('click', () => {

    families_array_list = []
    families_array_list_name = []
    family_table.innerHTML = ""

})


remove_member.addEventListener('click', () => {
    
    if(families_array_list.includes(invite_families_id.value))
    {
        families_array_list.pop()
        families_array_list_name.pop()
        // console.log(families_array_list ,families_array_list_name)
        if (families_array_list.length > 0)
        {
            family_table.innerHTML=""
            create_Dynamic_Table(['Family Name', 'Family Code'],families_array_list,family_table)
        }
    }
    
})
//Make an alert 
async function Load_Event_reminder_alert(){

    let eventResponse = await axios.get(`http://localhost:3001/events/event/current/month`)
    if(eventResponse)
    {
     
        reminder_icon.setAttribute('style',"color: #63E6BE")
        // reminder_icon.setAttribute('style',"color: red")
    }
    else
    {
        reminder_icon.setAttribute('style',"color: black")
    }

}


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
            "user_id": current_user_id,
            "address_id":address_list.value
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
            // console.log("Table data ", tableData[j])
        let familyResponse = await axios.get(`http://localhost:3001/families/family/${tableData[j]}`)      
            //  console.log(familyResponse.data)      
            const table_data_1 = document.createElement('td')
            table_data_1.textContent = familyResponse.data.family_name
            t_row.appendChild(table_data_1) 

            
            const table_data_2 = document.createElement('td')           
            table_data_2.textContent = `${familyResponse.data.family_code}`
            t_row.appendChild(table_data_2)

            // const table_data_3 = document.createElement('td')
            // table_data_3.textContent = tableData[j].relationship
            // t_row.appendChild(table_data_3)

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
        due_date.value = new Date(eventResponse.data.due_date).toLocaleDateString()
        description.value = eventResponse.data.description
        is_completed.value = eventResponse.data.completed
        cost_estimation.value = eventResponse.data.cost_estimation
        weather_condition.value = eventResponse.data.weather_condition
        specialday_note.value = eventResponse.data.specialday_note
        special_notes.value = eventResponse.data.special_notes
        current_user_id = eventResponse.data.user_id
        families_array_list = eventResponse.data.invite_families_id
        currenct_event_UID = eventResponse.data._id
        address_list.value = eventResponse.data.address_id
        // console.log(families_array_list)
        // let list_of_family_menbers = familyResponse.data
        if (families_array_list.length > 0)
        {
            create_Dynamic_Table(['Family Name', 'Family Code'],families_array_list,family_table)
        }
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
            "user_id": current_user_id,
            "address_id":address_list.value
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
reminder_icon.addEventListener ('click', () => { window.location.href='reminder.html'})