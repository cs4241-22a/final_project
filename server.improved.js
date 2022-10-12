const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "blogposter323@gmail.com",
    pass: "fxyehuusnwtzzlrs"
  }
});

// SETUP
const express = require('express')
const compression = require('compression')
const app = express()
const mongodb = require('mongodb')

require('dotenv').config()

app.use(express.json())
app.use(compression())

console.log(process.env.HOST)

// CONNECT TO DATABASE
let username
let password
let type

let usersDB
let postsDB
const connect = async () => {
  console.log('trying to establish connection to database')
  const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
  const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true})

  try {
    await client.connect()
    console.log('connected to mongodb server')
  } catch (e) {
    console.log('error connecting!')
    console.error(e)
  }

  //usersDB = client.db("webware").collection("users")
  //postsDB = client.db("webware").collection("posts")
  usersDB = client.db("blog").collection("users")
  postsDB = client.db("blog").collection("posts")
  //console.log(usersDB)
}

connect()



// POST BLOG ONTO DATABASE
app.post('/api/postblog', async (req, res) => {
  console.log(req.body)
  await postsDB.insertMany([req.body])
  res.writeHead(200, "OK", {'Content-Type': 'application/json'})
  res.end()
  //console.log(req.body)
})

// GET ALL POSTS
app.get('/api/getblogs', async (req, res) => {
  console.log('getting user data!')
  const output = await postsDB.find({ }).toArray()
  console.log(output)
  res.writeHeader(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(output))
})

let verificationCode

// LOGIN
app.post('/api/login', async (req, res) => {
  let error = false
  await usersDB.findOne({'name': req.body.name, 'password': req.body.password}).then(data => {
    if (data === null) {
      res.writeHead(404, "Username or Password Wrong", {'Content-Type': 'application/json'})
      res.end()
      error = true
    } else {
      res.writeHead(200, "OK", {'Content-Type': 'application/json'})
      res.end()
    }
  })

  if (!error) {
    let result = ""

    for (let i = 0; i <= 5; i++) {
      result += Math.floor(Math.random() * 10).toString()
    }
    verificationCode = result

    const message = {
      from: "blogposter323@gmail.com",
      to: req.body.name,
      subject: "Blog Poster Verification Code",
      text: ("Your Verification code is: " + result)
    }
    
    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err)
        res.writeHead(404, "Email Error", {'Content-Type': 'application/json'})
        res.end()
      } else {
        console.log(info)
        username = req.body.name // delete later????
        password = req.body.password
        type = req.body.type
        res.writeHead(200, "OK", {'Content-Type': 'application/json'})
        res.end()
      }
    })
  }
});

// VERIFICATION CODE
app.get('/api/getVerification', (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({'verification': verificationCode, 'username': username, 'password': password, 'type': type}))
})

// CREATE NEW ACCOUNT
app.post('/api/createUserDatabase', async (req, res) => {
  console.log(req.body)
  await usersDB.insertMany([req.body])
  res.writeHead(200, "OK", {'Content-Type': 'application/json'})
  res.end()
  //console.log(req.body)
})

app.post('/api/createuser', (req, res) => {
  //console.log('deleteing reminder')
  console.log(req.body)
  let result = ""

  for (let i = 0; i <= 5; i++) {
    result += Math.floor(Math.random() * 10).toString()
  }
  verificationCode = result

  const message = {
    from: "blogposter323@gmail.com",
    to: req.body.name,
    subject: "Blog Poster Verification Code",
    text: ("Your Verification code is: " + result)
  }
  
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err)
      res.writeHead(404, "Email Error", {'Content-Type': 'application/json'})
      res.end()
    } else {
      console.log(info)
      username = req.body.name // delete later????
      password = req.body.password
      type = req.body.type
      res.writeHead(200, "OK", {'Content-Type': 'application/json'})
      res.end()
    }
  });

  

  //res.redirect('http://localhost:3000/home')
  //res.end()

  /*const deleteItem = await remindersDB.deleteMany({_id: mongodb.ObjectId(req.body._id)})
  if (deleteItem) {
    res.writeHead(200, "OK", {'Content-Type': 'application/json'})
    res.end()
  } else {
    res.writeHead(404, "id not found", {'Content-Type': 'application/json'})
    res.end()
  }*/
})

app.listen(3001, (e) => {
  console.log('started up server')
})


/*const express = require('express'),
      mongodb = require('mongodb'),
      cookieSession = require('cookie-session'),
      path = require('path')
      app = express(),
      passport = require('passport'),
      compression = require('compression'),
      GitHubStrategy = require('passport-github2').Strategy,
      port = 3000

require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUBCLIENTID,
    clientSecret: process.env.GITHUBCLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile)
}))

// setup passport and github OAuth
app.use(cookieSession({
  name: 'github-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(compression())
app.use(express.static('./client/build'))

app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))
app.get('/auth/github/callback',
 passport.authenticate('github', { failureRedirect: '/auth/error' }), (req, res) => {
  console.log('redirecting to main webpage')
  res.redirect('/')
})

const checkAuth = (req, res, next) => {
  console.log('check auth')
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next()
  }
  console.log('about to redirect!!!!!')
  res.redirect('/auth/login')
}

let remindersDB

const connect = async () => {
  console.log('trying to establish connection to database')
  const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST
  const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true})

  try {
    await client.connect()
    console.log('connected to mongodb server')
  } catch (e) {
    console.log('error connecting!')
    console.error(e)
  }

  remindersDB = client.db("datatest").collection("test")
  console.log(remindersDB)
}

connect()

app.get('/', checkAuth, (req, res) => {
  console.log('in main page')
  res.sendFile(path.join(__dirname, '/private/index.html'))
})

//////////////////// GET DATA ////////////////////
app.get('/auth/getusername', checkAuth, (req, res) => {
  res.writeHeader(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({'username': req.user.username}))
})

app.get('/api/getdata', checkAuth, async (req, res) => {
  console.log('getting user data!')
  console.log(req.user.username)
  const output = await remindersDB.find({ user: req.user.username }).toArray()
  console.log(output)
  res.writeHeader(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(output))
})
//////////////////////////////////////////////////

//////////////////// POST DATA ///////////////////
app.post('/api/newreminder', checkAuth, async (req, res) => {
  req.body["user"] = req.user.username
  await remindersDB.insertMany([req.body])
  res.writeHead(200, "OK", {'Content-Type': 'application/json'})
  res.end()
})

app.post('/api/deletereminder', checkAuth, async (req, res) => {
  console.log('deleteing reminder')
  console.log(req.body)
  const deleteItem = await remindersDB.deleteMany({_id: mongodb.ObjectId(req.body._id)})
  if (deleteItem) {
    res.writeHead(200, "OK", {'Content-Type': 'application/json'})
    res.end()
  } else {
    res.writeHead(404, "id not found", {'Content-Type': 'application/json'})
    res.end()
  }
})

app.post('/api/updatereminder', checkAuth, async (req, res) => {
  console.log('updateing reminder')
  console.log(req.body)
  const updatedItem = await remindersDB.updateOne({_id: mongodb.ObjectId(req.body._id)}, {
    $set: {
      title: req.body.title,
      notes: req.body.notes,
      url: req.body.url,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location
    }
  })
  if (updatedItem) {
    console.log('updated item')
    res.writeHead(200, "OK", {'Content-Type': 'application/json'})
    res.end()
  } else {
    res.writeHead(404, "id not found", {'Content-Type': 'application/json'})
    res.end()
  }
})
//////////////////////////////////////////////////

app.listen(3001, (e) => {
  console.log('started up server')
})

*/