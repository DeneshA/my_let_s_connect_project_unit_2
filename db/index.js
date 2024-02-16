const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://denesh555:DyzJgVY0HxoDVGlB@cluster0.ctnnmmg.mongodb.net/letsConnectDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })



const db = mongoose.connection

module.exports = db