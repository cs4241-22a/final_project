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
const path = require('path')
const ChessGenerator = require('chess-creator')

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
        game: [], //SAN of the game
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
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//Auth Setup
const GitHubStrategy = require('passport-github').Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.github_id,
      clientSecret: process.env.github_secret,
      callbackURL: process.env.github_callback,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const username = profile.username
      const id = profile.id
      let user = await User.findById(id)
      if (user === null) {
        user = new User({ _id: id, username: username, gameHistory: [] })
        await user.save()
      }
      return cb(null, user)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})

app.get('/auth', passport.authenticate('github'))

app.get(
  '/auth/callback',
  passport.authenticate('github', { failureRedirect: '/error.html' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.cookie('username', req.user.username)
    res.redirect('/')
  }
)

app.get('/login', connectEnsureLogin.ensureLoggedOut(), (request, response) => {
  response.sendFile(__dirname + '/public/login.html')
})

app.get('/logout', function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
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

app.post('/result', connectEnsureLogin.ensureLoggedIn(), cors(), async (req, res) => {
  const engineName = req.body.engine
  const engineStrength = req.body.engineStrength
  const colorPlayed = req.body.colorPlayed
  const game = req.body.game
  const result = req.body.result
  const gameToAdd = {
    engine: engineName,
    engineStrength: engineStrength,
    colorPlayed: colorPlayed,
    result: result,
    game: game,
  }
  const user = await User.findById(req.user._id)
  user.gameHistory.push(gameToAdd)
  await user.save()
  res.end()
})

app.get(
  '/userstats',
  connectEnsureLogin.ensureLoggedIn(),
  cors(),
  async (req, res) => {
    const user = await User.findById(req.user._id)
    const gameHistory = user.gameHistory

    const stats = grabStats(gameHistory)
    res.json(stats)
  }
)

function grabStats(gameHistory) {
  let stockfishGameCount = 0
  let stockfishDiffCount = 0
  let stockfishResults = [0, 0, 0]
  let komodoGameCount = 0
  let komodoDiffCount = 0
  let komodoResults = [0, 0, 0]

  for (let i = 0; i < gameHistory.length; i++) {
    let game = gameHistory[i]
    //console.log(game)
    console.log(game.result)
    if (game.engine === 'StockFish') {
      stockfishGameCount++
      stockfishDiffCount += game.engineStrength
      if (game.result === 'win') {
        stockfishResults[0]++
      } else if (game.result === 'loss') {
        stockfishResults[1]++
      } else {
        stockfishResults[2]++
      }
    } else {
      komodoGameCount++
      komodoDiffCount += game.engineStrength
      if (game.result === 'win') {
        komodoResults[0]++
      } else if (game.result === 'loss') {
        komodoResults[1]++
      } else {
        komodoResults[2]++
      }
    }
  }
  let favoriteEngine = 'Stockfish'
  if (komodoGameCount > stockfishGameCount) {
    favoriteEngine = 'Komodo'
  }
  let stockfishAverage = 0
  let komodoAverage = 0
  if (stockfishGameCount > 0) {
    stockfishAverage = stockfishDiffCount / stockfishGameCount
  }
  if (komodoGameCount > 0) {
    komodoAverage = komodoDiffCount / komodoGameCount
  }

  const stats = {
    gamesPlayed: gameHistory.length,
    favoriteEngine: favoriteEngine,
    stockfish: {
      averageDifficulty: stockfishAverage,
      data: stockfishResults, //Wins, Losses, Draws
    },
    komodo: {
      averageDifficulty: komodoAverage,
      data: komodoResults, //Wins, Losses, Draws
    },
  }
  return stats
}

app.get(
  '/userhistory',
  connectEnsureLogin.ensureLoggedIn(),
  cors(),
  async (req, res) => {
    const user = await User.findById(req.user._id)
    const gameHistory = user.gameHistory
    res.json(gameHistory)
  }
)

app.get('/createImage', cors(), async (req, res) => {
  const pgn = req.query.pgn
  console.log(pgn)
  const generator = new ChessGenerator()
  generator.loadPGN(pgn)
  const buffer = await generator.generateBuffer()
  const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  res.json({ image: base64String })
})

app.use(connectEnsureLogin.ensureLoggedIn(), express.static('build'))
app.use(express.static('public'))
//Server Startup
console.log(`Starting Server on Port ${process.env.port}`)
app.listen(process.env.port)
