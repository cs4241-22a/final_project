require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const cookie = require("cookie-session");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongodb = require("mongodb");
const path = require("path");

const uri = `mongodb+srv://${process.env.UNAME}:${process.env.PASS}@a3cluster.klzdhtp.mongodb.net/?retryWrites=true&w=majority`;

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
      return Promise.all([
        client.db("When3Meet").collection("Users"),
        client.db("When3Meet").collection("Events"),
      ]);
    })
    .then((values) => {
      // store reference to collection
      users = values[0];
      events = values[1];
      // blank query returns all documents
      return Promise.all([users.find({}).toArray(), events.find({}).toArray()]);
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/info/:username", (req, res) => {
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[0].length; i++) {
      if (req.params.username === _appdata[0][i].username) {
        let user = _appdata[0][i];
        user.password = "";
        //edit this so that the user's avaibility is edited to remove the times they are in meetings
        for (let j = 0; j < user.joined.length; j++) {
          for (let k = 0; k < _appdata[1].length; k++) {
            if (user.joined[j] === _appdata[1][k].eventname) {
              let event = _appdata[1][k];
              if (event.isScheduled === true) {
                let startIndex =
                  event.scheduledDay * 48 + event.scheduledStart * 2;
                let endIndex = event.scheduledDay * 48 + event.scheduledEnd * 2;
                for (let k = startIndex; k < endIndex; k++) {
                  user.availability[k] = false;
                }
              }
              break;
            }
          }
        }
        res.status(200).send(user);
        return;
      }
    }
    res.status(404).send();
  });
});

// app.get("/isLoggedIn", (req, res) => {
//   refreshDB().then((_appdata) => {
//     for (let i = 0; i < _appdata[0].length; i++) {
//       if (req.session.user.username === _appdata[0][i].username) {
//         let user = _appdata[0][i];
//         user.password = "";
//         res.status(200).send(user);
//         return;
//       }
//     }
//     res.status(404).send();
//   });
// });

app.get("/event/:eventname/info", (req, res) => {
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        event = _appdata[1][i];
        let attendees = event.attendees;
        let groupAvailability = Array(336).fill(0);

        // Construct group availability vector
        attendees.forEach((e) => {
          let user = undefined;

          for (let i = 0; i < _appdata[0].length; i++) {
            if (e === _appdata[0][i].username) {
              user = _appdata[0][i];
              break;
            }
          }

          for (let i = 0; i < 336; i++) {
            groupAvailability[i] +=
              (user.availability[i] ? 1 : 0) / attendees.length;
          }
        });

        res.status(200).send({
          event: event,
          groupAvailability: groupAvailability,
          user: req.session.user.username,
          isScheduled: event.isScheduled,
          scheduledStart: event.scheduledStart,
          scheduledEnd: event.scheduledEnd,
          scheduledDay: event.scheduledDay,
        });
        return;
      }
    }
    res.status(400).send(undefined);
  });
});
app.get("/userLoggedIn", (req, res) => {
  res.status(200).send({ username: req.session.user.username });
});
// Used by the client to determine requested event is in the database
app.post("/validEvent", (req, res) => {
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.body.eventname === _appdata[1][i].eventname) {
        res.status(200).send({ valid: true });
        return;
      }
    }
    res.status(200).send({ valid: false });
  });
});

app.post("/validUser", (req, res) => {
  if (req.body.accountId === req.session.user.username) {
    res.status(200).send({ valid: true });
    return;
  }
  res.status(200).send({ valid: false });
});

app.post("/invitedUser", (req, res) => {
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.body.event === _appdata[1][i].eventname) {
        if (_appdata[1][i].visibility === false || _appdata[1][i].owner === req.session.user.username) {
          //public
          res.status(200).send({ valid: true });
          return;
        }
        let eventInvitees = _appdata[1][i].invitees;
        if (eventInvitees !== null) {
          let invitees = eventInvitees.split(",");
          for (let i = 0; i < invitees.length; i++) {
            if (req.session.user.username === invitees[i]) {
              res.status(200).send({ valid: true });
              return;
            }
          }
        }
      }
    }
    res.status(200).send({ valid: false });
  });
});

app.post("/handleSubmitEvent", (req, res) => {
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.body.eventname === _appdata[1][i].eventname) {
        res.status(200).send({ error: true });
        return;
      }
    }

    let event = {};

    event.eventname = req.body.eventname;
    event.attendees = [req.session.user.username];
    event.owner = req.session.user.username;
    event.comments = `${req.session.user.username} created the event.\n`;
    event.newComment = false;
    event.startTime = req.body.startTime;
    event.endTime = req.body.endTime;
    event.isScheduled = false;
    event.scheduledStart = -1;
    event.scheduledEnd = -1;
    event.visibility = req.body.visibility;
    if (req.body.visibility === true) {
      event.invitees = req.body.invitees;
    } else {
      event.invitees = undefined;
    }

    req.session.user.joined.push(event.eventname);
    req.session.user.owned.push(event.eventname);
    users.updateOne(
      { _id: mongodb.ObjectId(req.session.user._id) },
      {
        $set: {
          joined: req.session.user.joined,
          owned: req.session.user.owned,
        },
      }
    );
    events.insertOne(event);
    res
      .status(200)
      .send({ joined: true, eventname: event.eventname, error: false });
  });
});

app.post("/setAvailability", (req, res) => {
  req.session.user.availability = req.body.availability;
  users.updateOne(
    { _id: mongodb.ObjectId(req.session.user._id) },
    { $set: { availability: req.session.user.availability } }
  );
  res.status(200).send();
});

app.get("/:eventname/joinEvent", (req, res) => {
  refreshDB().then((_appdata) => {
    let event = undefined;
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        event = _appdata[1][i];
        break;
      }
    }
    if (typeof event !== "undefined" && event.eventname !== "") {
      //add user to event
      if (
        event.invitees !== null &&
        event.invitees.indexOf(req.session.user.username) <= -1
      ) {
        res.status(200).send({ joined: false, eventname: undefined });
        return;
      }
      event.attendees.push(req.session.user.username);
      req.session.user.joined.push(event.eventname);
      users.updateOne(
        { _id: mongodb.ObjectId(req.session.user._id) },
        { $set: { joined: req.session.user.joined } }
      );
      events.updateOne(
        { _id: mongodb.ObjectId(event._id) },
        { $set: { attendees: event.attendees } }
      );
      res.status(200).send({ joined: true, eventname: event.eventname });
    } else if (req.params.eventname !== "") {
      //make new event and make user EO
      event.eventname = req.params.eventname;
      event.attendees = [req.session.user.username];
      event.owner = req.session.user.username;
      event.comments = `${req.session.user.username} created the event.\n`;
      event.newComment = false;
      event.startTime = req.body.startTime;
      event.endTime = req.body.endTime;
      event.isScheduled = false;
      event.scheduledStart = -1;
      event.scheduledEnd = -1;
      event.scheduledDay = -1;
      event.invitees = req.body.invitees;

      req.session.user.joined.push(event.eventname);
      req.session.user.owned.push(event.eventname);
      users.updateOne(
        { _id: mongodb.ObjectId(req.session.user._id) },
        {
          $set: {
            joined: req.session.user.joined,
            owned: req.session.user.owned,
          },
        }
      );
      events.insertOne(event);
      res.status(200).send({ joined: true, eventname: event.eventname });
    } else {
      //event name empty
      res.status(200).send({ joined: false, eventname: undefined });
    }
  });
});

// app.get("/:eventname/leaveEvent", (req, res) => {
//   refreshDB().then((_appdata) => {
//     let event = undefined;
//     for (let i = 0; i < _appdata[1].length; i++) {
//       if (req.params.eventname === _appdata[1][i].eventname) {
//         event = _appdata[1][i];
//         break;
//       }
//     }
//     if (typeof event !== "undefined" && event.eventname !== "") {
//       //remove user from event
//       if (
//         event.invitees !== null &&
//         event.invitees.indexOf(req.session.user.username) <= -1
//       ) {
//         res.status(200).send({ joined: false, eventname: undefined });
//         return;
//       }
//       event.attendees.splice(
//         event.attendees.indexOf(req.session.user.username),
//         1
//       );
//       req.session.user.joined.splice(
//         req.session.user.joined.indexOf(event.eventname),
//         1
//       );
//       req.session.user.owned.splice(
//         req.session.user.owned.indexOf(event.eventname),
//         1
//       );
//       users.updateOne(
//         { _id: mongodb.ObjectId(req.session.user._id) },
//         {
//           $set: {
//             joined: req.session.user.joined,
//             owned: req.session.user.owned,
//           },
//         }
//       );
//       events.updateOne(
//         { _id: mongodb.ObjectId(event._id) },
//         { $set: { attendees: event.attendees } }
//       );
//       res.status(200).send({ joined: true, eventname: event.eventname });
//     } else if (req.params.eventname !== "") {
//       //make new event and make user EO
//       event.eventname = req.params.eventname;
//       event.attendees = [req.session.user.username];
//       event.owner = req.session.user.username;
//       event.comments = `${req.session.user.username} created the event.\n`;
//       event.newComment = false;
//       event.startTime = req.body.startTime;
//       event.endTime = req.body.endTime;
//       event.isScheduled = false;
//       event.scheduledStart = -1;
//       event.scheduledEnd = -1;
//       event.scheduledDay = -1;
//       event.invitees = req.body.invitees;

//       req.session.user.joined.push(event.eventname);
//       req.session.user.owned.push(event.eventname);
//       users.updateOne(
//         { _id: mongodb.ObjectId(req.session.user._id) },
//         {
//           $set: {
//             joined: req.session.user.joined,
//             owned: req.session.user.owned,
//           },
//         }
//       );
//       events.insertOne(event);
//       res.status(200).send({ joined: true, eventname: event.eventname });
//     } else {
//       //event name empty
//       res.status(200).send({ joined: false, eventname: undefined });
//     }
//   });
// });

app.get("/:eventname/leaveEvent", (req, res) => {
  refreshDB().then((_appdata) => {
    let event = undefined;
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        event = _appdata[1][i];
        break;
      }
    }
    if (
      typeof event !== "undefined" &&
      event.owner != req.session.user.username
    ) {
      //remove user from event
      event.attendees.splice(
        event.attendees.indexOf(req.session.user.username),
        1
      );
      req.session.user.joined.splice(
        req.session.user.joined.indexOf(event.eventName)
      );
      req.session.user.owned.splice(
        req.session.user.owned.indexOf(event.eventname),
        1
      );
      events.updateOne(
        { _id: mongodb.ObjectId(event._id) },
        { $set: { attendees: event.attendees } }
      );
      users.updateOne(
        { _id: mongodb.ObjectId(req.session.user._id) },
        {
          $set: {
            joined: req.session.user.joined,
            owned: req.session.user.owned,
          },
        }
      );
      res.status(200).send({ left: true, username: req.session.user.username});
    } else if (
      typeof event !== "undefined" &&
      event.owner === req.session.user.username
    ) {
      //delete event
      req.session.user.owned.splice(
        req.session.user.owned.indexOf(event.eventName),
        1
      );
      req.session.user.joined.splice(
        req.session.user.joined.indexOf(event.eventName),
        1
      );
      while (event.attendees.length > 0) {
        for (let i = 0; i < _appdata[0].length; i++) {
          if (_appdata[0][i].username === event.attendees[0]) {
            _appdata[0][i].joined.splice(
              _appdata[0][i].joined.indexOf(event.eventName),
              1
            );
            _appdata[0][i].owned.splice(
              _appdata[0][i].owned.indexOf(event.eventName),
              1
            );
            users.updateOne(
              { _id: mongodb.ObjectId(_appdata[0][i]._id) },
              { $set: { joined: _appdata[0][i].joined, owned: _appdata[0][i].owned } }
            );
            break;
          }
        }
        event.attendees.splice(0, 1);
      }
      events.deleteOne({ _id: mongodb.ObjectId(event._id) });
      res.status(200).send({ left: true, username: req.session.user.username});
    } else {
      //event name empty
      res.status(200).send({ left: false });
    }
  });
});

app.post("/:eventname/editEvent", (req, res) => {
  let event = undefined;
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        event = _appdata[1][i];
        break;
      }
    }
    if (
      typeof event !== "undefined" &&
      event.owner === req.session.user.username
    ) {
      events.updateOne(
        { _id: mongodb.ObjectId(event._id) },
        {
          $set: {
            isScheduled: req.body.isScheduled,
            scheduledStart: req.body.scheduledStart,
            scheduledEnd: req.body.scheduledEnd,
            scheduledDay: req.body.scheduledDay,
          },
        }
      );
      res.status(200).send({ edited: true });
    } else {
      res.status(400).send({ edited: false });
    }
  });
});
app.post("/:eventname/addComment", (req, res) => {
  let event = undefined;
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[1].length; i++) {
      if (req.params.eventname === _appdata[1][i].eventname) {
        event = _appdata[1][i];
        break;
      }
    }
    if (typeof event !== "undefined") {
      let updatedComments =
        event.comments + `${req.session.user.username}: ${req.body.comment}\n`;
      events.updateOne(
        { _id: mongodb.ObjectId(event._id) },
        { $set: { comments: updatedComments } }
      );
      res.status(200).send({ posted: true });

      if (event.owner != req.session.user.username) {
        events.updateOne(
          { _id: mongodb.ObjectId(event._id) },
          { $set: { newComment: true } }
        );
      }
    } else {
      res.status(404).send({ posted: false });
    }
  });
});

app.post("/login", (req, res) => {
  req.session.user = undefined;
  req.session.login = false;
  refreshDB().then((_appdata) => {
    for (let i = 0; i < _appdata[0].length; i++) {
      if (req.body.username === _appdata[0][i].username) {
        req.session.user = _appdata[0][i];
        break;
      }
    }
    // check if user exists and username provided is an actual username
    if (
      typeof req.session.user !== "undefined" &&
      req.body.password === req.session.user.password
    ) {
      req.session.login = true;
      res.status(200).send({ login: true, user: req.session.user });
    } else {
      req.session.login = false;
      req.session.user = undefined;
      res.status(200).send({ login: false, user: undefined });
    }
  });
});
app.get("/logout", (req, res) => {
  refreshDB().then((_appdata) => {
    req.session = null;
    res.status(200).send({ login: false });
  });
});
app.post("/register", (request, response) => {
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
      if (result !== undefined) {
        response.json({ login: false });
      } else {
        //user does not exist, create
        let newUser = {
          username: request.body.username,
          password: request.body.password,
          owned: [],
          joined: [],
          availability: Array(336)
            .fill()
            .map(() => false),
        };

        users.insertOne(newUser);request.session.user = newUser;
        request.session.login = true;
        response.json({ login: true, user: request.session.user });
      }
    });
});

app.use("*", express.static(path.join(__dirname, "build")));

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`server up, listening on ${port}`);
}); //idk how this needs to intergrate with vite yet also make sure start in package.json starts this server aswell
