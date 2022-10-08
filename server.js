const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cookie = require('cookie-session');
require('dotenv').config();
const path = require('path');

const uri = 'mongodb+srv://' + process.env.USER1 + ':' + process.env.PASS + '@' + process.env.HOST + '/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let recipecollection = null;
let usercollection = null;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit: 100000000000 }));

app.use(express.json());
app.use(cookie({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2]
}));

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: true }));

// middleware for unauthenticated users
app.use((req, res, next) => {
    if (recipecollection !== null && usercollection !== null) {
        next();
    } else {
        res.status(503).send();
    }
});

client.connect()
    .then(() => {
        return client.db('final_project').collection('recipes')
    })
    .then(__collection => {
        recipecollection = __collection;
    })
    .then(() => {
        return client.db('final_project').collection('users');
    })
    .then(__collection => {
        usercollection = __collection;
    });


app.post('/login', (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    usercollection.find({ $and: [{ password: { $exists: true } }, { username: user }] }).toArray()
        .then(result => {
            if (password === result[0].password) { //only one user/password combo should exist for each user
                req.session.login = true;
                req.session.username = req.body.username;
                res.redirect('index');
            } else {
                req.session.login = false;
                res.sendFile(__dirname + '/build/pages/login.html');
            }
        })
});

app.post('/register', (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    
    usercollection.find({ username: user }).toArray()
        .then(result => {
            if (result.length === 0) {
                //if username not found create new user and login
                let user_login = {
                    username: user,
                    password: password
                };
                usercollection.insertOne(user_login)
                    .then(function () {
                        req.session.login = true;
                        req.session.username = req.body.username;
                        res.redirect('/');
                    })
            } else {
                res.end(JSON.stringify("username already in use"));
            }
        })
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/build/pages/index.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/pages/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/build/pages/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/build/pages/register.html');
});

// recipe db interaction

app.post('/add', express.json(), (req, res) => {
    const data = req.body
    data.username = req.session.username
    recipecollection.insertOne(req.body)
        .then(result => res.json(result))
})

app.post('/update', express.json(), (req, res) => {
    recipecollection.find({ name: { $exists: true } }).toArray()
        .then(result => res.json(result));
})

// TODO: add the fields we will use to update route
app.post('/modify', express.json(), (req, res) => {
    const data = req.body
    const user = req.session.username

    recipecollection.updateOne({ $and: [{ name: name }, { username: user }] }, { $set: { name: data.name } })
        .then(result => res.json(result))
});

app.post('/delete', express.json(), (req, res) => {
    // delete a recipe made by a given user with a given name
    const user = req.session.username; // !!! where does "name" come from on the next line?
    recipecollection.deleteOne({ $and: [{ name: name }, { username: user }] })
        .then(result => res.json(result))
});

app.listen(3000);