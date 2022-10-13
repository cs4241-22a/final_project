const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookie = require('cookie-session');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit: 100000000000 }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: true }));

app.use(cookie({
    name: 'session',
    keys: [process.env.KEY1, process.env.KEY2]
}));

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
    { timestamps: true },
    { collection: 'userinfo' }
);

recipeSchema.index({ title: 1, user: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/recipedata', async (req, res) => {
    let allData = await Recipe.find({}); // later refine this, only send recipes written by the user
    res.json(allData).end();
});

app.get('/userdata', async (req, res) => {
    let allData = await User.find({});
    res.json(allData).end(); // later refine this, only send data for a given user
});

app.post('/login', (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    User.find({ $and: [{ password: { $exists: true } }, { username: user }] })
        .then(result => {
            if (password === result[0].password) { //only one user/password combo should exist for each user
                req.session.login = true;
                req.session.username = req.body.username;
                res.redirect('/');
            } else {
                req.session.login = false;
                res.end(JSON.stringify("Username or password incorrect. Please try again."));
            }
        });
});

app.post('/register', (req, res) => {
    const user = req.body.username;
    const password = req.body.password;

    User.find({ username: user })
        .then(result => {
            if (result.length === 0) {
                //if username not found create new user and login
                let user_login = {
                    username: user,
                    password: password
                };
                User.collection.insertOne(user_login)
                    .then(function () {
                        req.session.login = true;
                        req.session.username = req.body.username;
                        res.redirect('/');
                    })
            } else {
                req.session.login = false;
                res.end(JSON.stringify("**Username already in use. Please select a different one."));
            }
        })
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/build/pages/index.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/pages/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/build/pages/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/build/pages/register.html');
});

app.get('/addrecipe', (req, res) => {
    res.sendFile(__dirname + '/build/pages/addrecipe.html');
});

app.get('/editrecipe', (req, res) => {
    res.sendFile(__dirname + '/build/pages/editrecipe.html');
});

app.get('/viewrecipe', (req, res) => {
    res.sendFile(__dirname + '/build/pages/viewrecipe.html');
});

app.get('/home', (req, res) => {
    res.redirect('/');
});


app.get("/getUser", (req, res) => {
    if (req.session.login && req.session.username != null) {
        res.send({ "result": req.session.username });
    } else {
        res.send({ "result": false })
    };
});

// middleware for authentication; should only affect the data modification routes
app.use((req, res, next) => {
    if (Recipe !== null && User !== null) {
        next();
    } else {
        res.status(503).send();
    }
});

app.get('/logout', (req, res) => {
    req.session.login = false;
    req.session.username = false;
    res.redirect('/');
});

// recipe db interaction

app.post('/add', express.json(), async (req, res) => {
    const data = req.body;
    if (req.session.username == null) {
        res.redirect('/');
    } else {
        data.username = req.session.username;
        const recipes = await Recipe.find({ title: data.title }).exec();
        if (recipes.length === 0) {
            Recipe.collection.insertOne(data)
                .then(function () {
                    res.redirect('/');
                });
        } else {
            res.redirect('/');
        }
    }
});

//used by the view/edit page to get the full data for a recipe
app.post('/view', express.json(), async (req, res) => {
    const title = req.body.title;
    const recipes = await Recipe.find({ title: title });
    res.json(recipes[0]).end();
});

app.patch('/update', express.json(), async (req, res) => {
    await Recipe.findOneAndUpdate({ title: req.body.title, username: req.session.username }, {
        ingredients: req.body.ingredients, prepTime: req.body.prepTime,
        numPeople: req.body.numPeople, directions: req.body.directions
    });
    res.redirect('/');
});

app.post('/delete', express.json(), async (req, res) => {
    await Recipe.deleteOne({ title: req.body.title, username: req.session.username });
    res.redirect('/');
});

app.listen(3000);