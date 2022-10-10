import mongoose from 'mongoose'

const {Schema} = mongoose

const cell = new Schema({
    emoji: String,
    timeStamp: Date,
    user: mongoose.Types.ObjectId
})

const user = new Schema({
    username: String,
    timeOfLastEdit: Date
})