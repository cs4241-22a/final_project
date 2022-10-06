//Dependencies
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { Engine } = require('node-uci')
const cors = require('cors')
const mongoose = require('mongoose')
const { Schema } = mongoose
const passport = require('passport')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local')
const connectEnsureLogin = require('connect-ensure-login')

const inDev = true

const engines = [
  {
    name: 'StockFish',
    exec: './engines/stockfish',
  },
  {
    name: 'Komodo',
    exec: './engines/komodo-13.02-linux',
  },
  {
    name: 'LeelaChessZero',
    exec: './engines/leela/lc0',
  },
]

//Database Configuration
const UserSchema = new Schema(
  {
    _id: String,
    username: String,
    gameHistory: [
      {
        engine: String, //Engine you played against
        engineStrength: Number, //Elo of the engine
        colorPlayed: String, //What color played
        game: String, //SAN of the game
        result: String, // "win" "loss" or "draw"
      },
    ],
  },
  { collection: 'users' }
)
const User = mongoose.model('User', UserSchema)
mongoose.connect(process.env.db_url)

//Server Configuration
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

//Auth Setup
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const testUser = await User.findById('test')
    return cb(null, testUser)
  })
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

//Server Endpoints(
app.get('/bestmove', cors(), async (req, res) => {
  const fen = req.query.position
  const engineName = req.query.engine
  const movetime = req.query.movetime
  const engineInfo = engines.find((e) => e.name === engineName)
  const engine = new Engine(engineInfo.exec)

  await engine.init()
  await engine.position(fen)
  const output = await engine.go({ movetime: movetime })

  res.json(output)
  res.end()
})

app.get('/login', (req, res) => res.sendFile(__dirname + '/public/login.html'))
app.post(
  '/auth/callback',
  passport.authenticate('local', { failureRedirect: '/auth/error.html' }),
  function (req, res) {
    res.redirect('/')
  }
)

app.use(connectEnsureLogin.ensureLoggedIn(), express.static('build'))
//Server Startup
console.log(`Starting Server on Port ${process.env.port}`)
app.listen(process.env.port)
