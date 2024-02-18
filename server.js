const express = require('express');
const db = require('./db');
const cors = require('cors')
const bodyParser = require('body-parser');
const logger = require('morgan');
// require() imports and middleware here ^ ///////

const userProfielController = require('./controllers/userProfileController')
const familyProfileController = require('./controllers/familyProfileController')
const addressesController = require('./controllers/addressController')


const PORT = process.env.PORT || 3001

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(logger('dev'))
// app.use() middleware here ^ ///////////////////

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

//[[[[[[[[[[[[[[ Start ==========User Profile=========]]]]]]]]]]]]]]

app.get('/users',userProfielController.getAllUserProfile)

app.post('/users',userProfielController.createUserProfile)

app.put('/users/:id',userProfielController.updateUserProfile )

app.delete('/users/:id',userProfielController.deleteUserProfile)

app.get('/users/current/user/:name',userProfielController.getDetailsByUserName)

app.get('/users/user/:id',userProfielController.getFullNameById)

//[[[[[[[[[[[[[[ End ==========User Profile=========]]]]]]]]]]]]]]

//[[[[[[[[[[[[[[ Start ========== Family Profile=========]]]]]]]]]]]]]]

app.get('/families',familyProfileController.gettAllFimilieProfile)

app.post('/families',familyProfileController.createFamilyProfile)

app.put('/families/:id',familyProfileController.updateFamilyProfile)

app.delete('/families/:id',familyProfileController.deletefamilyProfile)

//Call the Family Detal by family Code
app.get('/families/family/code/:name',familyProfileController.get_familY_infor_by_family_code)

//Get family profile id of each child records
// app.get('/families/family/?family_code=code&current_UID=uid',familyProfileController.get_family_infor_by_code_and_UID)
// app.get('/families/family/',familyProfileController.get_family_infor_by_code_and_UID)
app.get('/families/family',familyProfileController.get_family_infor_by_code_and_UID)



//[[[[[[[[[[[[[[ End ========== Family Profile=========]]]]]]]]]]]]]]

//[[[[[[[[[[[[[[ Start ========== Address =========]]]]]]]]]]]]]]

app.get('/addresses',addressesController.getAlladdress)

app.post('/addresses',addressesController.createAddress)

app.put('/addresses/:id',addressesController.updateAddress)

app.delete('/addresses/:id',addressesController.deleteAddress)

app.get('/addresses/address',addressesController.get_an_Address_by_unit_and_street_name)
//[[[[[[[[[[[[[[ End ========== Address =========]]]]]]]]]]]]]]

