let display_container = document.querySelector('.display-container')

let current_user_id =""
Load_Event_reminder()
document.addEventListener('DOMContentLoaded', function () {
    Load_Event_reminder()
});
async function Load_Event_reminder(){

    let eventResponse = await axios.get(`http://localhost:3001/events/event/current/month`)
    //let userResponse = await axios.get(`http://localhost:3001//users/user/${current_user_id}`)
    if(eventResponse)
    {
        //<i class="fa-regular fa-bell" style="color: #63E6BE;"></i>
        // dynamic_Table.setAttribute('class','border-table')
        reminder_icon.setAttribute('style',"color: #63E6BE")
        // console.log(eventResponse.data)
        let listofEventCurrentMonth = eventResponse.data
        console.log(listofEventCurrentMonth)
        let data_list = ""
        listofEventCurrentMonth.map((element)=>{
                data_list +=    `<ul dir="ul-long">
                                <li class="li-long"> Event : ${element.event_name} </li>
                                <li class="li-long"> Event Date : ${new Date(element.due_date).toDateString()} </li>
                                <li class="li-long"> Event Forcast :${element.weather_condition}</li>
                                <li class="li-long"> Event Forcast :${element.description}</li>
                                </ul>
                                `
        })
        // console.log(data_list)
        display_container.innerHTML = data_list
    }
    else
    {
        reminder_icon.setAttribute('style',"color: #63E6BE")
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