const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000
const express = require( 'express' ),
      cookie  = require( 'cookie-session' ),
      hbs     = require( 'express-handlebars' ).engine,
      mongodb = require( 'mongodb' );
const app = express();

const APP_PORT = 3000//listener.address().port

app.use( express.json() )

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST


const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

//-----------------------------------------------------BEGIN LOGGER-----------------------------------------------------

const logger = (req,res,next) => {
  console.log( 'url:', req.url )
  next()
}

app.use( logger )

//-----------------------------------------------------ESTABLISH MONGODB CONNECTION-----------------------------------------------------

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'AlfieDB' ).collection( 'AlfieVoting' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

  //Check connection
  app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })
  
//-----------------------------------------------------MIDDLEWARE AND POST ROUTES-----------------------------------------------------------------
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )

// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.post( '/login', (req,res)=> {

  //find if user exists
  collection.find({username: req.body.username, password: req.body.password}, {$exists: true}).toArray(function(err, docs) {     
    if(docs.length > 0) //if exists
    {
        console.log("Valid Login"); // print out what it sends back
        req.session.login = true
        // since login was successful, send the user to the main content
        // use redirect to avoid authentication problems when refreshing
        // the page or using the back button, for details see:
        // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
        res.redirect('/') 
    }
    else // if it does not 
    {
        req.session.login = false
        console.log("Invalid Login");
        res.redirect('/login');
    }});
})

app.post( '/create-user', (req,res)=> {
  // assumes only one object to insert
  let dataString = ''

  console.log(req.body.username)

  req.on( 'data', function( data ) {
    dataString += data 
  })
  
  req.on( 'end', function() {
    const json = JSON.parse( dataString )
    
    //find if user exists
    collection.find({username: json.username}, {$exists: true}).toArray(function(err, docs) {     
    if(docs.length > 0) //if exists
    {
        req.session.login = false
        console.log("User Exists"); // print out what it sends back
        res.redirect('/');
    }
    else // if it does not 
    {
        console.log("New User");
        req.session.login = true;
        collection.insertOne(json)
        res.redirect('/');
    }});
  })
})

//-----------------------------------------------------ESTABLISH MONGODB CRUD ROUTES-----------------------------------------------------
  
app.post( '/tryme', (req,res) => {
  // assumes only one object to insert
  console.log("Test")
  console.log()
})

  //Add a route to add an Alfie Vote
  app.post( '/add', (req,res) => {
    // assumes only one object to insert
    let dataString = ''

    console.log(req.body.username)

    req.on( 'data', function( data ) {
      dataString += data 
    })

    req.on( 'end', function() {
      const json = JSON.parse( dataString )
      // add a 'json' field to our request object
      // this field will be available in any additional
      // routes or middleware.
      //req.json = JSON.stringify( dreams )
      collection.insertOne( json).then( result => res.json( result ) )
    })
  })

  //Add a route to remove from DB
  app.post( '/remove', (req,res) => {
    collection
      .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
      .then( result => res.json( result ) )
  })

  //Add route to update from DB
  app.post( '/update', (req,res) => {
    collection
      .updateOne(
        { _id:mongodb.ObjectId( req.body._id ) },
        { $set:{ name:req.body.name } }
      )
      .then( result => res.json( result ) )
  })

//-----------------------------------------------------ESTABLISH GET ROUTES AND PUBLIC ACCESS-----------------------------------------------------

// http://expressjs.com/en/starter/basic-routing.html
app.use(express.static("public"));

app.get("/", function(request, response) {
  console.log(request)
  if( request.session.login === true ){
    console.log("Logged In")
    response.sendFile( __dirname + '/views/index.html' );  
  } else{
    console.log("Logged Out")
    response.redirect('/login') 
  }                                                  
});

app.get("/view-response-history", function(request, response) {
  if( request.session.login === true )
    response.sendFile(__dirname + "/views/view-response-history.html");
  else{
    response.redirect('/login') 
  }
});

app.get("/create-user", function(request, response) {
  response.sendFile( __dirname + '/views/create-user.html' );
});

app.get("/login", function(request, response) {
  response.sendFile( __dirname + '/views/login.html' );
});

//-----------------------------------------------------BEGIN SERVER LISTENING-----------------------------------------------------
// listen for requests :)
const listener = app.listen(APP_PORT, function() {
  console.log("Your app is listening on port " + APP_PORT);
});

server.listen( process.env.PORT || port )
