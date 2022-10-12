import express, { Request, Response } from "express";
import Cell, { ICell } from "./DB_Schema/cellSchema.js";
import Users, { IUser } from "./DB_Schema/userSchema.js";
import mongoose, { Collection } from "mongoose";
import * as dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { router as authRouter, checkAuthentication } from "./Routes/auth.js";
import { router as gridRouter } from "./Routes/gridRouter.js";
import { WebSocketServer } from "ws";
import http from "http";
import EventEmitter from "events";
import { CellOperation } from "./serverDataTypes";

// load .env file
dotenv.config();
const defaultPort = "3000";

// Current Canvas
const canvasSize = 50;
const canvas = Array.from({ length: canvasSize * canvasSize }).fill({
  user: "",
  timeStamp: new Date(),
  emoji: "",
}) as ICell[];

// Pixel updated event
const serverEvents = new EventEmitter();

dotenv.config({ path: ".env" });

const port = "3000";
// Setup static express server
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });

//app.use(express.static("build"));

wss.on("connection", (ws) => {
  console.log("New Client connected");

  ws.on("message", (message) => {
    const operation = <CellOperation>JSON.parse(message.toString());

    console.log(`Got message:`);
    console.log(operation);

    canvas[operation.index] = operation.newCell;

    console.log(canvas);
  });

  ws.on("close", (event) => {
    console.log(`Client ${ws} disconnected`);
  });
});

const listenPort = process.env.PORT || port;
app.listen(listenPort);
console.log(`Listening on port ${listenPort}`);

//configure server to use express-session
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

//Setup mongoDB connection
const mongoURI =
  "mongodb+srv://" +
  process.env.MONGODB_USER +
  ":" +
  process.env.MONGODB_PASS +
  "@" +
  process.env.MONGODB_HOST;
//connect to server
mongoose.connect(mongoURI);
const connection = mongoose.connection;

//verify conenction
connection.once("open", async () => {
  console.log("DB Connected");
});

/* Routing */
app.use("/updateCell", gridRouter);
app.use("/cell", gridRouter);
app.use("/grid", gridRouter);
app.use("/login", authRouter);

app.use("/logout", (req: Request, res: Response, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

app.use(["/", "/load"], checkAuthentication, async (req, res) => {
  res.redirect("/grid");
  // const data = await Users.findOne({ github_id: req.session.user?.github_id });
  // res.send(data?.timeOfLastEdit)
});
