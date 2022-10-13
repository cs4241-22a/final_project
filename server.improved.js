const express = require('express');
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
// activate express
const app = express();
// main rewuired modules
const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;
// proecess .env file
require('dotenv').config()
// add static serving components
const serveStatic = require('serve-static');
// body parser needs for json
const bodyParser = require('body-parser');
// session handler
const cookie = require( 'cookie-session' );
// mongodb driver
const { MongoClient, ServerApiVersion } = require('mongodb');
// construct mongo related vars
const muri = "mongodb+srv://"+process.env.MONGO_USER+":"+ process.env.MONGO_PASSWORD+"@a3cluster.oip0htf.mongodb.net/?retryWrites=true&w=majority";
const mClient = new MongoClient(muri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let collection = null
// show what we got
console.log(muri)
// connect to mongodb
mClient.connect()
  .then( () => {
    console.log(muri)
    // will only create collection if it doesn't exist
    return mClient.db( 'finalProject' ).collection( 'data')
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({ }).toArray()
  })
  .then( console.log )

  if( collection !== null ){
    console.log("here")
    //collection.find({ }).toArray().then( result => res.json( result ) )
  }
// not needed
var appdata = {};
// add url encoding
app.use( express.urlencoded({ extended:true }) )
// activate cookie handeling: session
app.use( cookie({
  name: 'session',
  keys: [process.env.SESSION_K1, process.env.SESSION_K2]
}))
// serve all static pages as we need CSS. etc
app.use(serveStatic(dir, { index: ['login.html', 'login.htm'] }));
// login call before session validation
app.post("/login",(request,response) => handlePostL( request, response ));
app.post('/signup',(request,response,next) => handlePostSignUp( request, response, next ));
// start validation session and cookie data
// we send people to login when they do not have login flag set
// problem we also ned to 
app.use( function( req,res,next) {
  console.log("Check Session")
  console.log(req.session)
  if( req.session.login === true ){
    console.log(req.session)
    next()
  } else {
    if( 'body' in req ) {
      console.log(req.body)
      console.log(req.path)
    }
    console.log("sending ... login.html")
    app.get('/signup',(request,response,next) => handleSignUp( request, response, next ));
    res.sendFile( __dirname +"/" + dir + '/login.html' )
  }
})
// update profile goes after cookie validation
// userupdate GET route (to serve initial html page)
app.get('/userupdate',(request,response,next) => sendUpdatePage( request, response, next ));
// userupdate POST route
app.post('/userupdate',(request,response,next) => handlePostUpdate( request, response, next ));
// sends user data (per session object) as json to the client
app.get('/pasteschedule',(request,response,next) => sendSchedule( request, response, next ));
app.get('/userfetch',(request,response,next) => handleGetUserUpdate( request, response, next ));
// sends classes to the client
app.get('/classesfetch',(request,response,next) => handleGetClasses( request, response, next ));
// sends blocks to the client
app.get('/blocksfetch',(request,response,next) => handleGetBlocks( request, response, next ));
// signput comes after cookie validation
app.get('/signout',(request,response,next) => handleSignOut( request, response, next ));
// deal with json data
app.use(bodyParser.json({type: 'text/plain'}));
// handle /submit (not needed yet)
app.post('/submit',(request,response) => handlePostJ( request, response ));
// shows user data
app.get('/showuser',(request,response) => handleGetJ( request, response ));
// updates class selection calls
app.post('/classSelection',(request,response) => userClassesUpdate( request, response ));

// /submit handler

// handeles post login call
async function handlePostL( request, response ) {
  console.log("handlePostL geting args ... ");
  console.log(request.body );
  // see if we have email
  if( 'password' in request.body && 'email' in request.body ){
    // check password
    var user = await getUser(request.body.email);
    if( user !== null) {
      // we have user
      console.log(user)
      if( user.password === request.body.password ){
        // we are good
        // set cookie
        console.log("login is good")
        request.session.login = true;
        request.session.email = request.body.email;
        console.log(request.session)
        console.log("sending redirect");
        //response.sendFile( __dirname +"/" + dir + 'main.html' );
        response.redirect( 'main.html' )
      } 
    } 
  }
  // ask user again
  response.sendFile( __dirname +"/" + dir + '/login.html' );
}
// signs out user - cleans session object
const handleSignOut = function( request, response, next ) {
  console.log("in signout ... ");
  console.log( request.session );
  if( request.session.login === true ){
    request.session.login = false;
    request.session.email = '';
    response.sendFile( __dirname +"/" + dir + '/login.html' );
  } else {
    // clean up session
    next();
  }
}
// sends signup.html if you are not logged in
const handleSignUp = function( request, response, next ) {
  if( request.body.login === true ){
    next();
  } else {
    response.sendFile( __dirname +"/" + dir + '/signup.html' );
  }
}

// updates user name or password, or both
async function handlePostSignUp( request, response, next ) {
  console.log("in handlePostSignUp");
  console.log( request.body );

  // perform actions on the collection object 
  // check if we have such a user ...
  if( 'email' in request.body ){
    var email = request.body.email;
    var aduser = false;
    var user = await getUser(email);
    if( user !== null ){
      console.log("handlePostSignUp: user Exists")
    } else {
      console.log("Can create a new user")
      aduser = true;
    }
    if( user !== null ){
      // we have user ... 
      console.log("handlePostSignUp user exists");
      response.sendFile( __dirname +"/" + dir + '/login.html' );
    } else {
      // insert user
      console.log("pusing email "+ email + " into appdata")
      user = {'email': email,'cars': [],'name': '', 'password': ''};
      // check password
      if( 'password' in request.body){
        user['password'] = request.body.password;
      }
      // check name
      if( 'name' in request.body){
        user['name'] = request.body.name;
      }
      console.log("handlePostSignUp: "+user)
      // send user to login page now
      response.sendFile( __dirname +"/" + dir + '/login.html' );
      if( aduser ){
        await addUser(user);
      }
    }
  } else {
    response.sendFile( __dirname +"/" + dir + '/signup.html' );
  }
}
// sends updated user data
async function handleGetUserUpdate( request, response, next ) {
  console.log("in userupdate  ... ");
  console.log( request.session );
  if( request.session.login === true ){
    // construct Json file to push to the user for rendering
    var email = request.session.email;
    var user = await getUser(email)
    if( user !== null ){
      // I have my my e-mail
      console.log(user)
      var rb = JSON.stringify(user)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(rb)
    }
  } else {
    // clean up session
    next();
  }
}
// returns classes json
async function handleGetClasses( request, response, next ) {
  console.log("handleGetClasses: ... ");
  console.log( request.session );
  if( request.session.login === true ){
    // construct Json file to push to the user for rendering
    var classes = await getClasses()
    if( classes !== null ){
      // I have my my e-mail
      console.log(classes)
      var rb = JSON.stringify(classes)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(rb)
    }
  } else {
    // clean up session
    next();
  }
}

// returns block json
async function handleGetBlocks( request, response, next ) {
  console.log("handleGetBlocks: ... ");
  console.log( request.session );
  if( request.session.login === true ){
    // construct Json file to push to the user for rendering
    var blocks = await getBlocks()
    if( blocks !== null ){
      // I have my my e-mail
      console.log(blocks)
      var rb = JSON.stringify(blocks)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(rb)
    }
  } else {
    // clean up session
    next();
  }
}

const sendUpdatePage = function( request, response, next ) {
  console.log("in sendUpdatePage  ... ");
  console.log( request.session );
  if( request.session.login === true ){
    response.sendFile( __dirname +"/" + dir + '/update.html');
  } else {
    // clean up session
    next();
  }
}

const sendSchedule = function(request, response,next){
  console.log("About to send the schedule")
  console.log(request.session)
  if(request.session.login === true){
    response.sendFile(__dirname + "/" + dir + '/schedule.html')
  }
}
// returns user record (if exists) or null
async function getUser(email){
  var ret = null;
  if( collection !== null){

    console.log("getUser: have, email: "+email)
    ret = await collection.findOne(
      {$and:[
        {'type': 'teacher'},
        {'email': email}
      ]}
    )
    console.log("getUser return: ",ret);
  }
  return ret;
}
// returns all classes data from mongodb
async function getClasses(){
  var ret = null;
  if( collection !== null){
    console.log("getClasses:")
    ret = await collection.find(
      {'type': 'class'}
    ).toArray()
    console.log("getClasses returns: ",ret);
  }
  return ret;
}
async function getClass(code){
  var ret = null;
  if( collection !== null){
    console.log("getClass: calss code: "+code)
    ret = await collection.findOne(
      {$and:[
        {'type': 'class'},
        {'code': code}
      ]}
    )
    console.log("getClass returns: ",ret);
  }
  return ret.toArray();
}
// returns all blocks data from mongodb
async function getBlocks(){
  var ret = null;
  if( collection !== null){
    console.log("getBlocks:")
    ret = await collection.find(
      {'type': 'block'}
    ).toArray()
    console.log("getBlocks return: ",ret);
  }
  return ret;
}
async function getBlock(name){
  var ret = null;
  if( collection !== null){
    console.log("getBlock: block name: "+name)
    ret = await collection.findOne(
      {$and:[
        {'type': 'block'},
        {'name': name}
      ]}
    )
    console.log("getBlock returns: ",ret);
  }
  return ret;
}
// json object for a user
async function addUser(user){
  if( collection !== null){
    console.log("addUser: have collection: "+user);
    var ret = collection.insertOne( user );
    return true;
  } else {
    return false;
  }
}
// update User. we only work on name and password fields
async function updateUser(user){
  if( collection !== null){
    console.log("updateUser: have collection: ");
    try {
      console.log(user)
      await collection.updateOne(
                                {'_id': user._id},
                                { 
                                  $set: {
                                          'name': user.name
                                  }
                                }
            );
      await collection.updateOne(
              {'_id': user._id},
              { 
                $set: {
                        'password': user.password
                }
              }
      );
      return true;
    } catch (e){    
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
}
// updating 'shced' dictionajry for the user in mongodb
async function updateClassesData(user){
  if( collection !== null){
    try {
      await collection.updateOne({'_id': user._id},{ $set: {'sched': user.sched}});
      return true;
    } catch (e){    
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
}

async function handlePostUpdate( request, response, next ) {
  console.log("in handlePostUpdate");
  console.log( request.body );

  // perform actions on the collection object 
  // check if we have such a user ...
  if( 'email' in request.session ){
    var email = request.session.email;
    var aduser = false;
    var user = await getUser(email);
    if( user !== null ){
      console.log("handlePostSignUp: user Exists")
    } else {
      console.log("Can create a new user")
      aduser = true;
    }
    if( user === null ){
      // we have user ... 
      console.log("handlePostSignUp user does not exist");
      response.sendFile( __dirname +"/" + dir + '/signup.html' );
    } else {
      // update user
      // password first
      if( 'password' in request.body){
        user['password'] = request.body.password;
      }
      // check name
      if( 'name' in request.body){
        user['name'] = request.body.name;
      }
      console.log("handlePostUpdate: ")
      console.log(user)
      // send user to login page now
      response.sendFile( __dirname +"/" + dir + '/main.html' );
      var r = await updateUser(user);
      console.log(r)
    }
  } else {
    response.sendFile( __dirname +"/" + dir + '/signup.html' );
  }
}

async function handleGetJ( request, response ) {
  console.log("handleGetJ geting args ... ")
  var email = request.session.email;
  console.log(email)
  // do we have user
  var user = await getUser(email);
  if(user !== null){
    // send json data to the client
    var rb = JSON.stringify(user)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(rb)
  }
}
// handeles user class/block selection
async function userClassesUpdate( request, response, next ) {
  console.log("in userClassUpdate");
  console.log( request.body );

  // perform actions on the collection object 
  // check if we have such a user ...
  if( 'email' in request.session ){
    var email = request.session.email;
    var aduser = false;
    var user = await getUser(email);
    var bl = request.body.updates.bl;
    var cl = request.body.updates.cl;
    //
    if( user !== null ){
      console.log("userClassUpdate: user Exists")
    } else {
      console.log("Can create a new user")
      aduser = true;
    }
    if( user === null ){
      // we have user ... 
      console.log("userClassUpdate user does not exist");
      response.sendFile( __dirname +"/" + dir + '/signup.html' );
    } else {
      // update user class data
      // add these to user's record
      if(! 'sched' in user){
        user['sched'] = {}
      }
      user['sched'][bl] = cl;
      console.log(user)
      // send updates to user
      await updateClassesData(user)
      response.sendFile( __dirname +"/" + dir + '/main.html' );
    }
  } else {
    response.sendFile( __dirname +"/" + dir + '/signup.html' );
  }
}

// start app
app.listen(port || process.env.PORT)
