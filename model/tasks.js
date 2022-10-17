const mongoose = require('mongoose')
require('dotenv').config() // TODO: Remove in production
const Schema = mongoose.Schema
const ObjectId = require('mongodb').ObjectId

const uri = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.MONGO_HOST+"/QuickNotes"
// connect Mongoose
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology:true})

const Note = new Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteContent: {
        type: String,
        optional: true
    },
    noteColor:{
        type: String,
        required:true
    },
    posX:{
        type: String,
        required:true
    },
    poxY:{
        type: String,
        optional: true
    },
    userId:{
        type:ObjectId,
        required:true
    }, 
    boardId:{
        type:Number,
        required:true
    }

})

module.exports = mongoose.model('Notes',Note)