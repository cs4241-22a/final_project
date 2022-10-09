require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/database?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true,});
let collection = null

client.connect((err) => {
    collection = client.db('database').collection('data'); 
});

// Init express application
const app = express();

// Start listening on defined port
app.listen(process.env.PORT || 3000, () => {
    console.log('Now listening on port ' + process.env.PORT || 3000);
});

// BodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve React build
app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html")
});