import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import http from "http";
import EventEmitter from "events";
import cors from "cors";
import { router as authRouter, checkAuthentication } from "./Routes/auth.js";
import { WebSocketServer } from "ws";
import Cell, { ICell } from "./DB_Schema/cellSchema.js";
import { router as gridRouter } from "./Routes/gridRouter.js";

/* ------------- CONSTANTS AND INITIALIZATIONS ------------- */

dotenv.config({ path: ".env" });

const PORT = "3000";
const app = express();

app.use(cors());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const listenPort = process.env.PORT || PORT;

/* ------------- ENVIRONMENT CONFIGURATION ------------- */

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  console.log("Connected!");
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    name: "session",
    secret: "catSuperSecret",
    cookie: {
      secure: false,
      maxAge: 3 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ------------- WEB SOCKET CONFIGURATION ------------- */

const serverEvents = new EventEmitter();
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
  console.log("New Client connected");

  ws.on("message", (message) => {
    const cell = JSON.parse(message.toString()) as ICell;

    // todo sync here
  });

  ws.on("close", (event) => {
    console.log(`Client ${ws} disconnected`);
  });
});

/* ------------- EXPRESS ROUTING AND REDIRECT CONFIGURATION ------------- */

app.use("/login", authRouter);
app.use("/canvas", (req, res) => {
  res.redirect("/");
});
app.use("/authenticated", checkAuthentication);
app.use("/grid", gridRouter);

// app.use("/logout", (req: Request, res: Response, next) => {
//   req.logOut(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/login");
//   });
// });

// app.use("/updateCell", gridRouter);
// app.use("/cell", gridRouter);
// app.use("/grid", gridRouter);

app.use("/", express.static("build"));

server.listen(listenPort, () => {
  console.log(`Listening on port ${listenPort}`);
});

/* ------------- MISCELLANEOUS CODE ------------- */

// Current Canvas
const canvasSize = 50;
const canvas = Array.from({ length: canvasSize * canvasSize }).fill({
  user: "",
  timeStamp: new Date(),
  emoji: "",
}) as ICell[];
