require('dotenv').config()

const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      mongodb = require("mongodb"),
      express = require('express'),
      app =  express(),
      path = require('path'),
      port = 3000

app.use(express.static(path.join(__dirname, "build")));
 
app.listen( process.env.PORT || port )

// ----------------- Database --------------
const { MongoClient, ServerApiVersion, MongoDBNamespace, ObjectId } = require('mongodb');
const uri = `mongodb+srv://admin:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let userCollection = client.db( 'GoataShop' ).collection( 'Users' );
let productCollection = client.db( 'GoataShop' ).collection( 'Products' );

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'GoataShop' ).collection( 'Users' )
  })
  .then( __userCollection => {
    // store reference to collection
    userCollection = __userCollection
    // blank query returns all documents
  })
  .then( () => {
    return client.db( 'GoataShop' ).collection( 'Products' )
   })
   .then(_productCollection => {
     productCollection = _productCollection
     console.log(productCollection.find({}).toArray()) 
     console.log('hi') 

  })


app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({ }).toArray().then( result => res.json( result ) )
  }
})