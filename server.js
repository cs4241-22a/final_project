require('dotenv').config();
const express = require('express'),
      app     = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.json());
app.use(express.static('build'));

let db = null;

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db('musicSuggestion')
  })
  .then( _db => {
    // store reference to collection
    db = _db;
  });


app.listen(8080);