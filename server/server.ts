import express from "express";

const PORT = "3000";

const app = express();
const listenPort = process.env.PORT || PORT;

app.use(express.static("build"));

app.listen(listenPort);

console.log(`Listening on port ${listenPort}`);
