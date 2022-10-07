const express = require("express"),
	mongodb = require("mongodb"),
	bodyParser = require("body-parser"),
	app = express();

app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("images"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = `mongodb+srv:${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let collection = null;
let user = "user1"; //need to figure out when to set username of logged in user
let events = [];

const connect = async function () {
	await client.connect()
	collection = await client.db('A4').collection('collection')
	const results = await collection.find({}).toArray()
	console.log(results)
}

const handleAddEvent = async function (req, res) {
	if (collection !== null) {
		await collection.updateOne(
			{ User: user },
			{ $set: { events: events } }
		)
	}
}


connect();



app.get( "/", (req, res) => {
	if(collection !== null){
		let cData = JSON.stringify(collection.find({User:user}).toArray());
		response.end(cData);
	}
});

app.post("/addEvent", (req, res) => {
	events.push(req.body.event);
	if (collection !== null) {
		handleAddEvent();
    }
});

/*app.post("/removeEvent", (req, res) => {
	events.splice(,1);
	if (collection !== null) {
		handleAddEvent();
	}
}) */


app.listen(process.env.PORT || 3000)

