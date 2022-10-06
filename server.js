require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const UserRouter = require('./api/User')
const connectDB = require('./config/dbConn')

app.use(express.json())

//use ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
// bodyParser
const bodyParser = require('express').json;
app.use(bodyParser())

//Routes
// Home page 
app.get('/', (req, res) => {
    res.render('index') // will change when these pages exist
})
// Sign up
app.get('/signup', (req, res) => {
    res.render('index') // will change when these pages exist
})
// Sign in
app.get('/signin', (req, res) => {
    res.render('index') // will change when these pages exist
})
// leaderboard
app.get('/leaderboard', (req, res) => {
    res.render('index') // will change when these pages exist
})
// Users route
app.use('/user', UserRouter)


connectDB();

const db = mongoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 3000, () => console.log(`Server Started on Port ${process.env.PORT || 3000}`));
})