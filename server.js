const express = require('express');
const db = require('./db');
const cors = require('cors')
const bodyParser = require('body-parser');
const logger = require('morgan');
// require() imports and middleware here ^ ///////

const userProfielController = require('./controllers/userProfileController')
const familyProfileController = require('./controllers/familyProfileController')


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

//[[[[[[[[[[[[[[ End ========== Family Profile=========]]]]]]]]]]]]]]