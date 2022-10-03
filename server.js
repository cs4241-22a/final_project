require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')


//use ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))


app.get('/gamerTime', (req, res) => {
    res.render('index')
})




app.listen(3000)