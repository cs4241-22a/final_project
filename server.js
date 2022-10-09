require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const cookie = require("cookie-session");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://" +
  process.env.UNAME +
  ":" +
  process.env.PWD +
  "@a3cluster.klzdhtp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let users = null,
  events = null;

const refreshDB = () => {
  return client
    .connect()
    .then(() => {
      // will only create collection if it doesn't exist
      return Promise.All([
        client.db(" ").collection("users"),
        client.db(" ").collection("events"),
      ]);
    })
    .then((values) => {
      // store reference to collection
      users = values[0];
      events = values[1];
      // blank query returns all documents
      return Promise.All([users.find({}).toArray(), events.find({}).toArray()]);
    });
};
refreshDB();

app.use(
  cookie({
    name: "session",
    keys: [
      "2iMAwLWcViIKX5kAXuted14Jejr5Nwd4",
      "8ihbYfca2GFjh3eTvL1zpaWbgY0fZGWh",
    ],
  })
);
app.use(express.json());

app.get("/:username/info", (req, res) => {
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[0].length; i++) {
      if (req.params.username === _appdata[0][i].username) {
        res.status(200).send(_appdata[0][i]);
        return;
      }
    }
    res.status(200).send(undefined);
  });
});
app.get("/event/:eventname/info", (req, res) => {
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        res.status(200).send(_appdata[1][i]);
        return;
      }
    }
    res.status(200).send(undefined);
  });
});
app.post("/setAvailability", (req, res) => {
  req.session.user.availability = req.body.availability;
  users.updateOne(
    { _id: MongoClient.ObjectId(req.session.user._id) },
    { $set: { availability: req.session.user.availability } }
  );
});
app.post("/:eventname/joinEvent", (req, res) => {
  refreshDB().then((_appdata) => {
    let event = undefined;
    for (let i = 0; i < _appdata[0].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        event = _appdata[1][i];
        break;
      }
    }
    if (typeof event !== "undefined" && event.eventname !== "") {
      //add user to event

      event.attendees.push(req.session.user.username);
      users.updateOne(
        { _id: MongoClient.ObjectId(req.session.user._id) },
        { $set: { joined: req.session.user.joined } }
      );
      events.updateOne(
        { _id: MongoClient.ObjectId(event._id) },
        { $set: { attendees: event.attendees } }
      );
      console.log(event);
      res.status(200).send({ joined: true });
    } else if (event.eventname !== "") {
      //make new event and make user EO
      event.description = "";
      event.attendees = [req.session.user.username];
      event.owner = req.session.user.username;
      event.comments = `${req.session.user.username} created the event.\n`;
      event.newComment = false;
      event.startTime = 0;
      event.endTime = 23;
      event.isScheduled = false;
      event.scheduledStart = -1;
      event.scheduledEnd = -1;

      req.session.user.joined.push(event.eventname);
      users.updateOne(
        { _id: MongoClient.ObjectId(req.session.user._id) },
        { $set: { joined: req.session.user.joined } }
      );
      events.insertOne(event);
      console.log(event);
      res.status(200).send({ joined: true });
    } else {
      //event name empty
      res.status(200).send({ joined: false });
    }
  });
});
app.post("/:eventname/leaveEvent", (req, res) => {
  refreshDB().then((_appdata) => {
    let event = undefined;
    for (let i = 0; i < _appdata[0].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        event = _appdata[1][i];
        break;
      }
    }
    if (typeof event !== "undefined" && event.owner != req.session.user.username) {
      //remove user to event

      event.attendees.push(req.session.user.username);
      users.updateOne(
        { _id: MongoClient.ObjectId(req.session.user._id) },
        { $set: { joined: req.session.user.joined } }
      );
      events.updateOne(
        { _id: MongoClient.ObjectId(event._id) },
        { $set: { attendees: event.attendees } }
      );
      console.log(event);
      res.status(200).send({ left: true });
    } else if (typeof event !== "undefined"&& event.owner === req.session.user.username) {
      //delete event
      req.session.user.joined.push(event.eventname);
      users.updateOne(
        { _id: MongoClient.ObjectId(req.session.user._id) },
        { $set: { joined: req.session.user.joined } }
      );
      events.insertOne(event);
      console.log(event);
      res.status(200).send({ left: true });
    } else {
      //event name empty
      res.status(200).send({ left: false });
    }
  });
});
app.post("/:eventname/editEvent", (req, res) => {
  console.log(req.params.eventname);
});
app.post("/:eventname/addComment", (req, res) => {
  console.log(req.params.eventname);
});
app.post("/login", (req, res) => {
  req.session.user = undefined;
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[0].length; i++) {
      if (req.body.username === _appdata[0][i].username) {
        req.session.user = _appdata[0][i];
        break;
      }
    }
    if (typeof req.session.user !== "undefined" && req.body.username !== "") {
      if (req.body.password === req.session.user.password) {
        req.session.login = true;
        res.status(200).send({ login: true, user: req.session.user });
      } else {
        req.session.login = false;
        res.status(200).send({ login: false, user: undefined });
      }
    } else {
      req.session.login = false;
      res.status(200).send({ login: false, user: undefined });
    }
  });
});
app.post("/logout", (req, res) => {
  req.session.user = undefined;
  req.session.login = false;
  res.status(200);
});
app.post("/register", (request, response) => {
  console.log("create new account");
  request.session.user = undefined;
  refreshDB()
    .then((_appdata) => {
      for (let i = 0; i < _appdata[0].length; i++) {
        if (request.body.username === _appdata[0][i].username) {
          return _appdata[0][i];
          break;
        }
      }
      return undefined;
    })
    .then((result) => {
      if (result === undefined) {
        response.json({ login: false });
      } else {
        //user does not exist, create
        let newUser = {
          username: request.body.username,
          password: request.body.password,
          owned: [],
          joined: [],
          availability: [],
        };

        console.log(newUser);
        users.insertOne(newUser);
        console.log("creating new account");
        console.log(request.body.username);
        request.session.user = request.body.username;
        console.log("name:");
        console.log(request.session.user);
        request.session.login = true;
        response.json({ login: true, user: request.session.user });
      }
    });
});
