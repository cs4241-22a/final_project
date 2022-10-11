import express from "express";
import Cells from './DB_Schema/cellSchema';
import Users, { IUser } from './DB_Schema/userSchema.js';
import mongoose, { Collection } from "mongoose";
import * as dotenv from "dotenv"

// load .env file
dotenv.config();

const port = '3000';

// Setup static express server
const app = express();

app.use(express.static('build'));

const listenPort = process.env.PORT || port;
app.listen(listenPort);
console.log(`Listening on port ${listenPort}`);


//Setup mongoDB connection
mongoose.connect("mongodb+srv://"+process.env.MONGODB_USER+":"+process.env.MONGODB_PASS+"@r-place-cluster.9odz6aw.mongodb.net/?retryWrites=true&w=majority")
const connection = mongoose.connection

const user1 = new Users({
    user: "michael",
    timeOfLastEdit: Date.now()
})
user1.save()
console.log('running')

connection.once('open', async ()=>{
    console.log("DB Connected")
    
    await Users.find({}, (error: any, docs: IUser[])=>{
        for(const user in docs){
            console.log(user)
        }

    })
})

app.on('listening', async ()=>{
    console.log("listening")
    
})