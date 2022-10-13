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
const favicon = require('serve-favicon')

const inDev = true

const engines = [
  {
    name: 'StockFish',
    exec: './engines/stockfish',
  },
  {
    name: 'Komodo',
    exec: './engines/komodo',
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
      }
    ]
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
app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );

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
  if (engineName === 'StockFish') {
    await engine.setoption('Skill Level', req.query.level)
  }

  if (engineName === 'Komodo') {
    await engine.setoption('Skill', req.query.level)
  }
  await engine.position(fen)
  const output = await engine
    .go({ movetime: movetime, depth: 20 })
    .catch((err) => console.log(err))

  res.json(output)
  res.end()
  await engine.quit()
})

app.post('/result', cors(), async (req, res) => {
  const engineName = req.body.engine
  const engineStrength = req.body.level
  const colorPlayed = req.body.colorPlayed
  const game = req.body.game
  const result = req.body.result
  const gameToAdd = {
    engine: engineName,
    engineStrength: engineStrength,
    colorPlayed: colorPlayed,
    game: game,
    result: result
  }

  //const user = new User({_id: '0', username: "test", gameHistory: []})
  const user = await User.findById('0')  // req.user._id

  user.gameHistory.push(gameToAdd)
  await user.save()
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

app.use(express.static('build'))
app.use(express.static('public'))
//Server Startup
console.log(`Starting Server on Port ${process.env.port}`)
app.listen(process.env.port)
