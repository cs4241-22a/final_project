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


const current = [
    {
        firstName: "Ben",
        lastName: "Jamin",
        address: "123 Banana Road",
        email: "barjam@att.net",
        age: "19",
        hobbies: "DJ-ing, gaming, coding",
        firstProject: "Visualizer for music",
        currentProject: "Decoder for music",
        status: "mingle",
        youngest: "18",
        oldest: "21",
        distance: "20",
        user: "benJamin4DaBananas",
        pic: "https://unsplash.com/photos/kfN-BBbWTWo"
    },
    {
        firstName: "Winston",
        lastName: "Tesla",
        address: "246 Overwatch Boulevard",
        email: "webteam@icloud.com",
        age: "25",
        hobbies: "Climbing, Coding",
        firstProject: "Team Analyzer Based on Enneagram Types",
        currentProject: "Climbing Path Simulator",
        status: "mingle",
        youngest: "21",
        oldest: "28",
        distance: "300",
        user: "winstonTinSpace",
        pic: "https://unsplash.com/photos/pAtA8xe_iVM"
    },
    {
        firstName: "Sunwoo",
        lastName: "Han",
        address: "324 Haven Avenue",
        email: "shang@yahoo.com",
        age: "23",
        hobbies: "Cooking, Skydiving, Coding",
        firstProject: "Cooking Simulator",
        currentProject: "Health Application for Skydivers",
        status: "date",
        youngest: "22",
        oldest: "26",
        distance: "4000",
        user: "jettMommy30",
        pic: "https://unsplash.com/photos/dE6c9RZoyL8"
    },
    {
        firstName: "Zyanya",
        lastName: "Mondragón",
        address: "389 Ascent Street",
        email: "empress40@me.com",
        age: "24",
        hobbies: "Axe Throwing, Spending Time with Family, Coding",
        firstProject: "Family Tree Analyzer",
        currentProject: "None",
        status: "date",
        youngest: "21",
        oldest: "26",
        distance: "2000",
        user: "empress1997",
        pic: "https://unsplash.com/photos/mEZ3PoFGs_k"
    },
    {
        firstName: "Shaun",
        lastName: "Chi",
        address: "130 Ta Lo Circle",
        email: "10rings@me.com",
        age: "25",
        hobbies: "Karaoke, Martial Arts, Coding",
        firstProject: "Calculator Application",
        currentProject: "Map Editor Application for Overseas",
        status: "mingle",
        youngest: "23",
        oldest: "26",
        distance: "3000",
        user: "iFoughtALizard10",
        pic: "https://unsplash.com/photos/iFgRcqHznqg"
    }
    ,



    {
        firstName: "Apple",
        lastName: "Bananas",
        address: "Cars Street",
        email: "applebananas@gmail.com",
        age: "32",
        hobbies: "Eating",
        firstProject: "None",
        currentProject: "None",
        status: "date",
        youngest: "18",
        oldest: "61",
        distance: "20",
        user: "applebananas",
        pic: ""
    },
    {
        firstName: "Desk",
        lastName: "Elevator",
        address: "Falcon Avenue",
        email: "deskelevator@gmail.com",
        age: "25",
        hobbies: "Stationary and Moving",
        firstProject: "Writing Papers",
        currentProject: "Moving up and down the floors",
        status: "mingle",
        youngest: "21",
        oldest: "78",
        distance: "300",
        user: "deskelevator",
        pic: ""
    },
    {
        firstName: "Good",
        lastName: "Hat",
        address: "Igloo Road",
        email: "goodhat@gmail.com",
        age: "98",
        hobbies: "Fashion",
        firstProject: "Building",
        currentProject: "None",
        status: "date",
        youngest: "22",
        oldest: "76",
        distance: "4000",
        user: "goodhat",
        pic: ""
    },
    {
        firstName: "Jester",
        lastName: "Kangaroo",
        address: "Lesser Blvd",
        email: "jester",
        age: "24",
        hobbies: "Circus",
        firstProject: "Zoo",
        currentProject: "None",
        status: "date",
        youngest: "18",
        oldest: "46",
        distance: "2000",
        user: "jesterkangaroo",
        pic: ""
    },
    {
        firstName: "Monster",
        lastName: "Nest",
        address: "Octopus Lane",
        email: "monsternest@gmail.com",
        age: "25",
        hobbies: "Sleeping",
        firstProject: "None",
        currentProject: "None",
        status: "mingle",
        youngest: "23",
        oldest: "46",
        distance: "3000",
        user: "monsternest",
        pic: ""
    }
]

const clientId = '903729e701c50a0a540c';
const clientSecret = '11c4d32e3febd2e660acae7b806438ff3c44384f';

const axios = require('axios');
let token = null;


// app.get('/test', (req, res) => {
//
//     for (let i = 0; i < 5; i++){
//         client.db( 'Final' ).collection( 'profiles' ).insertOne(current[i]);
//     }
// })

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
            req.session.pic = response.data.avatar_url;
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

app.get('/profilepic', (req, res) => {
    res.send(req.session.pic);
})

app.get('/getprofile', (req, res) => {
    client.db("Final").collection("profiles").find({user: req.session.user}).toArray().then(result => res.json(result));
})

app.post('/submit', (req, res) => {
    let newLog = (req.body);
    newLog.user = req.session.user;
    newLog.pic = req.session.pic;
    console.log(collection);
    client.db("Final").collection("profiles").insertOne(req.body).then(result => {
        res.redirect("/profile.html");
    })
})

app.get('/getAllMatches', (req, res) => {
    client.db("Final").collection("profiles").find().toArray().then(result => res.json(result))
})

app.get('/getUser', (req, res) => {
    res.send(req.session.user);
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