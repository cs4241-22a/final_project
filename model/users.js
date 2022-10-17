const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
require('dotenv').config({path:'../.env'}) 

const Schema = mongoose.Schema

const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.MONGO_HOST+"/QuickNotes"
// connect Mongoose
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology:true})

const User = new Schema({
    username: {
        type: String,
        required: true
    },
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('Users',User)