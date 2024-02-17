const express = require('express');
const db = require('./db');
const cors = require('cors')
const bodyParser = require('body-parser');
const logger = require('morgan');
// require() imports and middleware here ^ ///////

const userProfielController = require('./controllers/userProfileController')


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


//[[[[[[[[[[[[[[ End ==========User Profile=========]]]]]]]]]]]]]]

