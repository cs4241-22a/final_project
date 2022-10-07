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

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
});

let collection = null;
let user; //need to figure out when to set username of logged in user
let events = [];

const connect = async function () {
	console.log("tring to connect to db");
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
	console.log("retrieving data");
	if(collection !== null){
		console.log("connected");
		let cData = JSON.stringify(collection.find({User:user}).toArray());
		console.log(cData);
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


app.listen(process.env.PORT|| 3000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);

});

