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
        if(eventResponse.data.length > 0){
            reminder_icon.setAttribute('style',"color: #63E6BE") 
        }
        // reminder_icon.setAttribute('style',"color: #63E6BE")
        // console.log(eventResponse.data)
        let listofEventCurrentMonth = eventResponse.data
        console.log(listofEventCurrentMonth)
        let data_list = ""

        for (const element of listofEventCurrentMonth) {
            // console.log(element)
            let userResponse = await axios.get(`http://localhost:3001/users/user/${element.user_id}`)
            // let addressResponse = await axios.get(`http://localhost:3001/addresses/address/${element.address_id}`)
            //  console.log(userResponse.data.image)
            //  <li class="li-long"> <img src=${userResponse.data.image}> </li>
            data_list += `<div>
                            <div class="container">
                                <div class="user-image"> <img class="img-user" src=${userResponse.data.image}> </div>
                                <div class="event_list">
                                    <ul class="ul-long">                            
                                        <li class="li-long"> Event : ${element.event_name} </li>
                                        <li class="li-long"> Event Date : ${new Date(element.due_date).toDateString()} </li>
                                        <li class="li-long"> Event Forecast :${element.weather_condition}</li>
                                        <li class="li-long"> Event Description :${element.weather_condition}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>`
        }
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