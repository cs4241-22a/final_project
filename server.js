const express = require("express")
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cookie = require('cookie-session')
require('dotenv').config()
const path = require('path')

const uri = 'mongodb+srv://'+process.env.USER1+':'+process.env.PASS+'@'+process.env.HOST+'/?retryWrites=true&w=majority'

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
let recipecollection = null
let usercollection = null

// cookie middleware
app.use(express.json())
app.use( cookie({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2]
}))

//connect to the db
client.connect()
    .then( () => {
      //get the recipe collection
      // will only create collection if it doesn't exist
      return client.db( 'final_project' ).collection( 'recipes' )
    })
    .then( __collection => {
      // store reference to collection
      recipecollection = __collection
      // blank query returns all documents
    })
    .then( () => {
        //get the user collection
        return client.db( 'final_project' ).collection( 'users' )
    })
    .then( __collection => {
        // store reference to collection
        usercollection = __collection
        // blank query returns all documents
    })

//login area
app.post( '/login', (req,res)=> {
  const user = req.body.username
  const password = req.body.password
  //check user database for user
  usercollection.find({ $and: [ { password: { $exists: true } }, { username: user } ] }).toArray()
      .then( result => {
        if(result.length === 0) {
          //if username not found create new user and login
          let user_login = {
            username: user,
            password: password
          }
          usercollection.insertOne( user_login )
              .then( function() {
                req.session.login = true
                //set the username that was successful
                req.session.username = req.body.username
                res.redirect( 'index' )
              })
        } else if(password === result[0].password) { //only one user/password combo should exist for each user
          //good login
          req.session.login = true
          //set the username that was successful
          req.session.username = req.body.username
          res.redirect( 'index' )
        } else {
          //bad login attempt
          // cancel session login in case it was previously set to true
          req.session.login = false
          // password incorrect, send back to login page
          res.sendFile( __dirname + '/build/pages/login.html' )
        }
      })
})

app.get( '/index', ( req, res) => {
    res.sendFile( __dirname + '/build/pages/index.html' )
})

app.get( '/', (req,res) => {
    res.sendFile( __dirname + '/build/pages/index.html' )
})

app.use(express.static(path.join(__dirname, 'build')))

//middleware - sends unauthenticated users an error
app.use( (req,res,next) => {
  if( recipecollection !== null && usercollection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})
app.use( express.urlencoded({ extended:true }) )



//recipe db interaction

app.post( '/add', express.json(), (req, res) => {
    const data = req.body
    //add new data to db if not a clear or update call
    //add the username of the current session user to this data
    data.username = req.session.username
    recipecollection.insertOne( req.body )
        .then( result => res.json( result ) )
})

app.post( '/update', express.json(), (req, res) => {
    //simply do nothing; server just sends back the recipes it has
    recipecollection.find({ name: { $exists: true }}).toArray()
        .then( result => res.json( result ) )
})

//TODO: add the fields we will use to update route
app.post( '/modify', express.json(), (req, res) => {
    const data = req.body
    const user = req.session.username

    recipecollection.updateOne( { $and: [ { name: name }, { username: user } ] }, { $set:{ name: data.name } })
        .then( result => res.json( result ) )
})

app.post( '/delete', express.json(), (req,res) => {
  // delete a recipe made by a given user with a given name
  const user = req.session.username
  recipecollection.deleteOne({ $and: [ { name: name }, { username: user } ] })
      .then( result => res.json( result ) )
})

app.listen(3000)