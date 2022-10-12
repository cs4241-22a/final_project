require('dotenv').config();
const express = require('express'),
      app     = express(),
      cookie  = require( 'cookie-session' ),
      crypto = require("crypto");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use( express.urlencoded({ extended:true }))
const key1 = crypto.randomBytes(64).toString("hex");
const key2 = crypto.randomBytes(64).toString("hex");
app.use( cookie({
  name: 'final-project',
  keys: [key1, key2]
}))
let loggedIn = false;
let currUser = "";

app.use(express.json());
app.use(express.static('build'));

// reference to database connection
let db = null;

// make database connection
client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db('musicSuggestion')
  })
  .then( _db => {
    // store reference to collection
    db = _db;
  });

app.use((req,res,next) => {
  if(db !== null) {
    next();
  } else {
    res.status(503).send()
  }
})

app.post('/loggingIn', (req,res) => {
  
  db.collection('user').find({ }).toArray()
    .then(result => {
      let userLogin = false;
      console.log(req.body);
      
      for(let login of result) {
        if(login.user === req.body.user && login.pass === req.body.pass) {
          userLogin = true;
        }
      }

      if(userLogin) {
        req.session.login = true;
        loggedIn = true;
        currUser = req.body.user;
        console.log("login successful!");
      }else{
        req.session.login = false;
        loggedIn = false;
        console.log("Incorrect Login.");
      }
      res.json({login: loggedIn});
    })

 
});
app.post('/register', (req,res) => {
  console.log(JSON.stringify(req.body));
  db.collection('user').find({ }).toArray()
    .then(result => {
      let userFound = false;
      console.log(req.body);
      for(let login of result) {
        if(login.user === req.body.user) {
          userFound = true;
        }
      }

      if(userFound) {
        req.session.login = false;
        loggedIn = false;
        res.json({result: "This account already exists"});
      } else {
        /* Add user to database */
        req.session.login = true;
        loggedIn = true;
        currUser = req.body.user;
        
        db.collection("user").insertOne( req.body );
        res.json({result: ""});
      }
    })
});

app.get('/loginStatus', (req,res) => {
  res.json({login: loggedIn, user: currUser});
})

// Sends json array of all documents in the collection specified by req.body.name
app.post('/collDocs', (req,res) => {
  db.collection(req.body.name).find({ }).toArray()
  .then(result => res.json(result));
});

// Add a document to the relative collection containing req.body
app.post('/addPost', (req,res) => {
  db.collection("posts").insertOne(req.body).then(result => res.json(result))
});
app.post('/addResp', (req,res) => {
  db.collection("responses").insertOne(req.body).then(result => res.json(result))
});

// Delete a document from the relative collection specified by its _id
app.post('/deletePost', (req,res) => {
  db.collection("posts")
    .deleteOne({_id: ObjectId(req.body._id)})
    .then(result => res.json(result))
})
app.post('/deleteResp', (req,res) => {
  db.collection("responses")
    .deleteOne({ _id: ObjectId(req.body._id)})
    .then(result => res.json(result))
})


// Update a document in the relative collection with data passed into req.body
app.post('/updatePost', (req,res) => {
  db.collection("posts")
    .updateOne(
      {_id: ObjectId(req.body._id)},
      {$set: {user: req.body.user, comment: req.body.comment, responses: req.body.responses}}
    )
    .then(result => res.json(result))
})
app.post('/updatePostNewResponse', (req, res) => {
  console.log(JSON.stringify(req.body.responseid))
  db.collection("posts")
    .updateOne(
      {_id: ObjectId(req.body._id)},
      {$push: {responses: req.body.responseid}}
    )
    .then(result => res.json(result))
})
app.post('/updateResp', (req,res) => {
  db.collection("responses")
    .updateOne(
      {_id: ObjectId(req.body._id)},
      {$set: {user: req.body.user, song: req.body.song, artist: req.body.artist, comment: req.body.comment}}
    )
    .then(result => res.json(result))
})

app.listen(8080);