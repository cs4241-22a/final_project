const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookie = require('cookie-session');
require('dotenv').config();
const path = require('path');
let recipecollection = null;
let usercollection = null;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit: 100000000000 }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: true }));

// app.use(cookie({
//     name: 'session',
//     keys: [process.env.KEY1, process.env.KEY2]
// }));

// middleware for unauthenticated users
// app.use((req, res, next) => {
//     if (recipecollection !== null && usercollection !== null) {
//         next();
//     } else {
//         res.status(503).send();
//     }
// });

mongoose.connect(`mongodb+srv://${process.env.USER1}:${process.env.PASS}@${process.env.HOST}/final_project?retryWrites=true&w=majority`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Mongoose schema definitions
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true,
        },
        ingredients: {
            type: Array,
            required: true
        },
        directions: {
            type: String,
            required: true
        },
        prepTime: {
            type: Number,
            required: true
        },
        numPeople: {
            type: Number,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }, { collection: 'userinfo' }
);

recipeSchema.index({ title: 1, user: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/recipedata', async (req, res) => {
    console.log("Querying recipe data");
    await config();
    let allData = await Recipe.find({}); // later refine this, to only send recipes written by the user
    res.json(allData).end();
});

app.get('/userdata', async (req, res) => {
    await config();
    let allData = await User.find({});
    res.json(allData).end(); // later refine this, to only send data for a given user
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
        });
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