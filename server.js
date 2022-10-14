const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const responseTime = require('response-time')
const session = require('express-session')
const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')

const app = express()
const port = 3000
const dir = 'public'
const mongo = new MongoClient("mongodb+srv://timer:timer@cluster0.k2rloqb.mongodb.net/?retryWrites=true&w=majority")

const db = mongo.db("timer")
const users = db.collection("users")
const times = db.collection("times")

app.use ((req, res, next) => {
    res.setHeader("Content-Security-Policy",
                  "default-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';")
    next()
})
app.use(responseTime((req, res, time) =>
    console.log (`${req.method} ${req.path} in ${time}ms`)))
app.use(compression())
app.use(bodyParser.json())
app.use(session({secret: "Super Secret"}))

function fmtUsername (s) {
    return s.trim().toLowerCase()
}

app.post("/login", async ({body: {username, password}, session}, res) => {
    if (session.username) {
        res.status(200).send()
        return
    }
    username = fmtUsername(username)
    
    const user = (await users.findOne({username})) ||
          {username,
           password: await bcrypt.genSalt(10).then(s => bcrypt.hash(password, s))}

    user._id || (await users.insertOne(user))

    if (user && await bcrypt.compare(password, user.password)) {
        session.username = user.username;
        res.status(200).send()
    }
    else res.status(500).send ()
})

app.post("/logout", ({session}, res) => {
    session.username = undefined
    res.status(200).send()
})

app.post("/time", async ({body: {time}, session: {username}}, res) => {
    if (!username || !time) {
        res.status(500).send()
        return
    }
    
    await times.insertOne({username, time})
    res.status(200).send()
})

app.get("/time", async ({session: {username}}, res) => {
    if (!username) {
        res.status(500).send()
        return
    }
    
    const time = await times.find({username}).toArray()
    res.status(200).json({times: time}).send()
})

app.delete("/time/:id", async ({params: {id}, session: {username}}, res) => {
    if (!username) {
        res.status(500).send()
        return
    }
    await times.deleteOne({_id: ObjectId(id)})
    res.status(200).send()
})

async function displayName (username) {
    return users.findOne({username}).then(({name}) => name)
}

app.get("/leaderboard", async (_, res) => {
    const time = (await times.find().toArray())
          .reduce((users, {time, username}) => {
              users.set(username, Math.max(users.get(username) || 0, time))
              return users
          }, new Map())
    
    const leaderboard = Array.from(time.entries ())
          .map(([username, time]) => {
              return {name: username, time}
          }).sort((a, b) => a.time - b.time)
    res.status(200).json({leaderboard}).send()})

app.use(express.static(dir))


mongo.connect()
    .then(() => app.listen(port, () => null))
