// const { response } = require("express")

// Declar Web Element
let family_name = document.querySelector('#family-name')
let family_code =  document.querySelector('#family-code')
let anniversary = document.querySelector('#anniversary')
let user_name = document.querySelector('#user-name')
let full_Name = document.querySelector('#full-name')
let relationship = document.querySelector('#relationship')

//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')

let Current_UID =''

family_code.addEventListener('change', () => {

    load_current_family_profile_by_Family_Code()

})

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
            create_Dynamic_Table(['User Name', 'Full Name', 'Relationship'],list_of_family_menbers,'.family-table')
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
    document.querySelector(getElement).appendChild(dynamic_Table)
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
    create_family_members()
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

        // console.log(response)
        console.log("Family profile created Sucessfully")
    }
    catch(error)
    {
        throw new Error("Invalid family data",error.message)
    }

}

update_btn.addEventListener('click', () => {
    update_family_profile()
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

        console.log(validate_existing_family)
        // console.log(Current_UID)
   
        if(validate_existing_family){
            //if user existing then update the user profile
            let  response = await axios.put(`http://localhost:3001/families/${validate_existing_family.data._id}`,data_file)
//   //Need to update User profile on Family Id (But noe  mandertory)
            console.log(response)
            console.log("Family profile updated Sucessffully")

        }else {
            //if not exist can register new user profile
            console.log('new User',validate_existing_family)
        }
    }
    catch(error)
    {
        console.error("Error loading family profile:", error.message)
    }
}