const express = require("express"),
    cookie = require("cookie-session"),
    app = express()


app.use(express.static("public"));
app.use(express.static("views"));

app.use(express.json());

app.use( cookie({
    name: 'session',
    keys: ['testkey1', 'testkey2']
}))


const clientId = '903729e701c50a0a540c';
const clientSecret = '11c4d32e3febd2e660acae7b806438ff3c44384f';

const axios = require('axios');
let token = null;

app.get('/github', (req, res) => {
    // res.redirect("main.html");
    console.log(token)
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

app.get('/oauth-callback', (req, res) => {
    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        code: req.query.code
    };
    console.log(body);
    const header = { headers: { accept: 'application/json' } };
    axios.post(`https://github.com/login/oauth/access_token`, body, header).
    then(res => res.data['access_token']).
    then(_token => {
        console.log('My token:', _token);
        token = _token;
        client.db( 'Final' ).collection( 'Users' ).insertOne({token: token});
        // res.redirect("/main.html");
        res.redirect("/loggedIn");
    }).
    catch(err => res.status(500).json({ message: err.message }));
});

app.get('/loggedIn', (req, res) => {
    const header = {headers: {Authorization: "token " + token}};
    axios.get("https://api.github.com/user", header)
        .then(response => {

            req.session.login = true;
            req.session.user = response.data.login;
            console.log(req.session.user);
            client.db("Final").collection("profiles").find({user: req.session.user}).toArray(function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                    res.redirect("/profile.html");
                } else {
                    res.redirect("/main.html");
                }
            })
        })
})

app.post('/submit', (req, res) => {
    let newLog = (req.body);
    newLog.user = req.session.user;
    console.log(collection);
    client.db("Final").collection("profiles").insertOne(req.body).then(result => res.json(result))
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const {response} = require("express");
const uri = "mongodb+srv://admin:admin@final.nhlyk4z.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let collection = null;
let account = null;

client.connect()
    .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'Final' ).collection( 'Users' )
    })
    .then( __collection => {
        collection = __collection;
        // blank query returns all documents
        return collection.find({ }).toArray()
    })
    // .then( client.db( 'Final' ).collection( 'Activity Logs' ).insertOne({test: 12, testing: 13}))
    .then( console.log )

    .then( () => {
        return (client.db("Final").collection("profiles"));
    })
    .then( __account => {
        account = __account;
        // blank query returns all documents
        return account.find({ }).toArray()
    })
    .then( console.log )



app.get( '/', (req, res) => {
    if (collection !== null){
        collection.find({ }).toArray().then(result => res.json(result))
    }
})





app.listen(process.env.PORT || 9030);