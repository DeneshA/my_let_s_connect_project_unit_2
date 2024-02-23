Load_Event_reminder_alert()


//// Adding master button event
let user_icon =document.querySelector('#user')
let family_icon =document.querySelector('#family')
let address_icon =document.querySelector('#address')
let home_icon =document.querySelector('#home')
let event_icon =document.querySelector('#event')
// let task_icon =document.querySelector('#task')
let reminder_icon =document.querySelector('#reminder')

user_icon.addEventListener ('click', () => { window.location.href='userprofile.html'})
family_icon.addEventListener ('click', () => { window.location.href='familyProfile.html'})
address_icon.addEventListener ('click', () => { window.location.href='address.html'})
home_icon.addEventListener ('click', () => { window.location.href='index.html'})
event_icon.addEventListener ('click', () => { window.location.href='event.html'})
// task_icon.addEventListener ('click', () => { window.location.href='assignment.html'})
reminder_icon.addEventListener ('click', () => { window.location.href='reminder.html'})

//Make an alert 
async function Load_Event_reminder_alert(){

    let eventResponse = await axios.get(`http://localhost:3001/events/event/current/month`)
    if(eventResponse.data.length > 0)
    {
     
        reminder_icon.setAttribute('style',"color: #63E6BE")
        // reminder_icon.setAttribute('style',"color: red")
    }
    else
    {
        reminder_icon.setAttribute('style',"color: black")
    }

}
