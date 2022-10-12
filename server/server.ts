import express from "express";
import Cells, {ICell} from './DB_Schema/cellSchema';
import Users, { IUser } from './DB_Schema/userSchema.js';
import mongoose, { Collection } from "mongoose";
import * as dotenv from "dotenv";
import {WebSocketServer} from "ws";
import http from "http";
import EventEmitter from "events";
import {CellOperation} from "./serverDataTypes";

// load .env file
dotenv.config();
const defaultPort = '3000';

// Current Canvas
const canvasSize = 50;
const canvas = <ICell[]>Array.from({length: canvasSize*canvasSize})
	.fill(<ICell>{user: undefined, timeStamp: new Date(), emoji: ''});

// Pixel updated event
const serverEvents = new EventEmitter();

// Setup static express server
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server: server});

app.use(express.static('build'));

wss.on('connection', (ws) => {
	console.log("New Client connected");

	ws.on('message', (message) => {
		const operation = <CellOperation>JSON.parse(message.toString());

		console.log(`Got message:`);
		console.log(operation);

		canvas[operation.index] = operation.newCell;

		console.log(canvas);
	});

	ws.on('close', event => {
		console.log(`Client ${ws} disconnected`);
	});
});

const listenPort = process.env.PORT || defaultPort;
server.listen("3000", () => console.log(`Listening on port ${listenPort}`));


//Setup mongoDB connection
// mongoose.connect("mongodb+srv://"+process.env.MONGODB_USER+":"+process.env.MONGODB_PASS+"@r-place-cluster.9odz6aw.mongodb.net/?retryWrites=true&w=majority")
// const connection = mongoose.connection
//
// const user1 = new Users({
//     user: "michael",
//     timeOfLastEdit: Date.now()
// })
// user1.save()
// console.log('running')
//
// connection.once('open', async ()=>{
//     console.log("DB Connected")
//
//     await Users.find({}, (error: any, docs: IUser[])=>{
//         for(const user in docs){
//             console.log(user)
//         }
//
//     })
// })
//
// app.on('listening', async ()=>{
//     console.log("listening")
//
// })