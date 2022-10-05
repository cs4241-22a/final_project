require('dotenv').config()

const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'pages/',
      port = 3000

const express = require('express'),
      app     = express(),
      cors    = require('cors')

app.use( cors() )
app.use( express.static('./') )

const server = http.createServer( function( request,response ) {
    if( request.method === 'GET' ) {
      handleGet( request, response )    
    }
  })
  
  const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 ) 
  
    if( request.url === '/' ) {
      sendFile( response, 'pages/index.js' )
    }else{
      sendFile( response, 'pages/index.js' )
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
 
server.listen( process.env.PORT || port )

// ----------------- Database --------------
const { MongoClient, ServerApiVersion, MongoDBNamespace, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = client.db( '' ).collection( '' );
let userCollection = client.db( '' ).collection( '' );

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( '' ).collection( '' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({}).toArray()
  })
  .then( console.log )
  // route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})