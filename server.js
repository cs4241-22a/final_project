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
let User; //need to figure out when to set username of logged in user

client.connect();


app.get( "/", (req, res) => {
	if(collection !== null){
		let cData = JSON.stringify(collection.find({}).toArray());
		response.end(cData);
	}
});