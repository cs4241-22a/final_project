const express = require("express"),
	mongodb = require("mongodb"),
	bodyParser = require("body-parser"),
  axios = require("axios"),
  {v4: uuidv4 } = require('uuid'),
	app = express();

const {Octokit} = require("@octokit/core");

app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("images"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = 'mongodb+srv://user1:pass1@a4.vumsqbo.mongodb.net'

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let collection = null;
let user = "user1"; //need to figure out when to set username of logged in user
let events = [];

const connect = async function () {
	await client.connect()
	collection = await client.db('WebwareFinal').collection('Collection')
	const results = await collection.find({}).toArray()
  await getUserData();
}

const handleUpdateEvent = async function (req, res) {
	if (collection !== null) {
		await collection.updateOne(
			{ User:user},
			{ $set: { events: events } }
		)
	}
}

const handleShare = async function(req,sharedEvents){
  if (collection !== null) {
		await collection.updateOne(
			{ User:req.body.userToFind},
			{ $set: { sharedEvents: sharedEvents } }
		)
	}
}

const getSharedEvents = async function(req,res){
  const results = await collection.find({User:req.body.userToFind}).toArray()
  let sharedEvents = results[0].sharedEvents;
  return sharedEvents
}

const getUserData = async function(){
  if(collection !== null){
    let userData = await collection.find({User:user}).toArray()
    events = userData[0].events;
  }else{
    console.log("Error Connecting to Database");
  }
}

const addNewUser = async function(userToAdd){
  if(collection !== null){
    await collection.insertOne(
			{ User:userToAdd},
			{ $set: { events: [] } }
		)
  }
}

connect();
console.log("connect");



app.get( "/", (req, res) => {
  if(collection === null){
    connect();
  }
	if(collection !== null){
		let cData = JSON.stringify(collection.find({User:user}).toArray());
		res.end(cData);
	}
});

app.get("/getEvents",(req,res) => {
  res.send(events);
})

app.post("/addEvent", (req, res) => {
  let uniqueID = uuidv4();
  let event = {name: req.body.name, startDate: req.body.startDate, endDate: req.body.endDate, id: uniqueID, desc: req.body.desc};
	events.push(event);
  console.log(events);
  if(collection === null){
    connect();
  }
	if (collection !== null) {
		handleUpdateEvent();
    }
});

app.post("/removeEvent", (req, res) => {
  let index = events.findIndex(element => element.id === req.body.id);
	events.splice(index,1);
  if(collection === null){
    connect();
  }
	if (collection !== null) {
		handleUpdateEvent();
	}
})

app.post("/updateEvent", (req, res) => {
  let index = events.findIndex(element => element.id === req.body.id);
  console.log("updating entry at index: " + index);
  let event = {name: req.body.name, startDate: req.body.startDate, endDate: req.body.endDate, id: req.body.id, desc: req.body.desc};
  console.log(event);
	events[index] = event;
  if(collection === null){
    connect();
  }
	if (collection !== null) {
		handleUpdateEvent();
	}
})

app.post("/shareEventWithUser", (req,res) => {
  let event = {name: req.body.name, startDate: req.body.startDate, endDate: req.body.endDate, id: req.body.id, desc: req.body.desc};
  let sharedEvents = getSharedEvents(req,res);
  if(collection === null){
    connect();
  }
	if (collection !== null) {
		handleShare(req,sharedEvents);
	}
})


///////////////////// Github Authentication

//////getting the user name when we have an access token
let getUser = async function(token){
    const octokit = new Octokit({
    auth: token
  })
     let result = await octokit.request('GET /user', {});
     user = result.data.login;
     console.log(user);
     let allUsers = await collection.find({}).toArray();
     if(allUsers.filter(element => element.user === user)){
       addNewUser(user);
     }
}

app.get("/auth", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/oauth-callback", ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  // opts is used for the Accept header
  const opts = { headers: { accept: "application/json" } };

  // axios is a promise based HTTP client ( similar to fetch)
  axios
    .post("https://github.com/login/oauth/access_token", body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      console.log("My token:", token);

       getUser(token)

      res.redirect(`/?token = ${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

// redirects Github User to main.html
app.post("/loginGitHub", (req, res) => {
  res.redirect("calendar.html");
});
app.listen(process.env.PORT || 3000)
