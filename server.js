require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const UserRouter = require('./api/User')
const connectDB = require('./config/dbConn')

// INIT
app.use(express.json())
// bodyParser
const bodyParser = require('express').json;
app.use(bodyParser())
// use ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))



//Routes
// home page
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/home', (req, res) => {
    res.render('home')
})
// login page
app.get('/login', (req, res) => {
    res.render('login')
})
// signup page
app.get('/signup', (req, res) => { // changed createaccount to signup, cause shorter
    res.render('signup')
})
// leaderboard page
app.get('/leaderboard', (req, res) => {
    res.render('leaderboard') // will change when these pages exist
})
// game page
app.get('/game', (req, res) => {
    res.render('game') // will change when these pages exist
})
// Users route
app.use('/user', UserRouter)

// connect to database, ASK ME FOR THE ENV VARIABLES OR THIS WILL NOT WORK!!, 
// if you do not need to test w/ database then comment out this code
// uncomment last comment
connectDB();

const db = mongoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 3000, () => console.log(`Server Started on Port ${process.env.PORT || 3000}`));
})

//     app.listen(3000, () => console.log('Server Started on Port 3000'));
