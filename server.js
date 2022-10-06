require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')


//use ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/createaccount', (req, res) => {
    res.render('signup')
})




app.listen(3000)