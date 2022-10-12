const express = require( 'express' ),
      http = require( 'http' ),
      mongodb = require( 'mongodb' ),
      ServerApiVersion = require('mongodb'),
      fs   = require( 'fs' ),
      cookieParser = require('cookie-parser'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      morgan = require('morgan'),
      app = express(),
      dir  = 'public/',
      session = require('express-session'),
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]



//Connect to Server

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.URL}`;

const client = new mongodb.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1 })
let collection = null
let usercollection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'Final' ).collection( 'data' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )



client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'Final' ).collection( 'users' )
  })
  .then( __usercollection => {
    // store reference to collection
    usercollection = __usercollection
    // blank query returns all documents
    return usercollection.find({ }).toArray()
  })
.then( console.log )



app.use( express.static('public') )
app.use( express.json() )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cookieParser())
app.use(session({secret: "Shh, its a secret!"}));

// <-- Express Middleware --> //



/*
//Get every Playlist
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})
*/
//add a playlist to db
app.post( '/submit', (req, res) => {
  console.log(req.body)
  collection.insertOne( req.body ).then( result => res.json( result ) )
})


//delete 1 playlist with id == body._id
app.post( '/delete', (req, res) => {
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
})

//get a user with the username == body.user
app.post("/getUser",(req,res,next)=>{
   if( collection !== null ) {
    usercollection.find({ username:req.body.username }).toArray().then( result => res.json( result ) )
  }
})

//return wether or not body.username and body.password match a user in the db
app.post("/login",(req,res,next)=>{
  console.log("in login")   
   if( collection !== null ) {
    usercollection.find({ username:req.body.username }).toArray().then( result => res.json(result[0].password == req.body.password))
  }
  console.log("redirecting to top.html")
  //res.redirect( 'top.html' )
  //TODO FIX REDIRECT
})


app.post("/get",(req,res,next)=>{
   if( collection !== null ) {
    collection.find({}).toArray().then( result => res.json( result ) )
  }
})

app.post("/userCookie",(req,res) => {
  res.json(JSON.stringify(res.cookie['user']))
  console.log(res.cookie['user'])
})



//add a user to the db, username: body.username, password: body.password
app.post("/register",(req,res,next)=>{
   if( collection !== null ) {
    // check to see if name is taken
     console.log(req.body.username)
     console.log("registration")
    usercollection.find({ username:req.body.username }).toArray().then( result => {
      console.log(result.length)
      if(result.length == 0)  usercollection.insertOne( req.body )
      res.json(result.length == 0)
    })
  }
})

app.post( '/update', (req,res) => {
  //console.log(req.body)
  
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      { $set:{ genre:req.body.genre,title:req.body.title,artist:req.body.artist,vote:req.body.vote } }
    )
    .then( result => res.json( result ) )
})


//TODO update function
/*

{genre: genre.value, title: title.value, artist: artist.value, vote: 1 }


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
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

*/
app.get( '/', ( req, res ) => res.send( 'Hello World!' ) )

app.listen( 3000 )
