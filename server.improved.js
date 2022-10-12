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
const path = require('path')

require('dotenv').config()

app.use(express.json())
app.use(compression())
//app.use(express.static('dist'));

app.use(express.static('client/build'))

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
}

connect()

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

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
})

app.post('/api/createuser', (req, res) => {
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
})

app.listen(process.env.PORT || 3000, (e) => {
  console.log('started up server')
})