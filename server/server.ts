import express from "express";

const port = '3000';

// Setup static express
const app = express();

app.use(express.static('build'));

const listenPort = process.env.PORT || port;
app.listen(listenPort);
console.log(`Listening on port ${listenPort}`);