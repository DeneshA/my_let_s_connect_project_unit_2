// Declar Web Element
let family_name = document.querySelector('#family-name')
let family_code =  document.querySelector('#family-code')
let anniversary = document.querySelector('#anniversary')
let user_name = document.querySelector('#user-name')
let First_Name = document.querySelector('#First-Name')
let relationship = document.querySelector('#relationship')

//Button Web Element
let clear_btn = document.querySelector('#clear')
let submit_btn = document.querySelector('#submit')
let update_btn = document.querySelector('#update')
let delete_btn = document.querySelector('#delete')


family_code.addEventListener('change', () => {

    load_current_family_profile_by_Family_Code()

})

async function load_current_family_profile_by_Family_Code (){
    try{
        let familyResponse = await axios.get(`http://localhost:3001/families/family/code/${family_code.value}`)
        console.log(familyResponse)
        family_name.value = familyResponse.data[0].family_name
        family_code.value = familyResponse.data[0].family_code
        anniversary.value = new Date(familyResponse.data[0].anniversary).toLocaleDateString()




        let data_list=''
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
            console.log(userResponse.data)      
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