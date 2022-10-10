require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const helmet = require('helmet');
const bcrypt = require('bcrypt');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/database?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true,});
let collection = null

// Init express application
const app = express();

// Start listening on defined port
app.listen(process.env.PORT || 3000, () => {
    console.log('Now listening on port ' + process.env.PORT || 3000);
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet({
    crossOriginEmbedderPolicy: false
}));

// Serve React build
app.use(express.static(__dirname + "/client/build"));

// Get routes
app.get("/user-data", (req, resp) => {
    const userId = req.query.id;
    // Fetch user data from DB

    if (!userId) { // Guard clause
        resp.end();
    }
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            // If DB connection is successful
            const db = client.db("database");
            db.collection("data").findOne({"_id": new ObjectId(userId)}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    // Found user document
                    const body = {
                        cannedJarredData: res.cannedJarredData,
                        dairyData: res.dairyData,
                        dryBakingData: res.dryBakingData,
                        frozenData: res.frozenData,
                        grainsData: res.grainsData,
                        meatData: res.meatData,
                        produceData: res.produceData,
                        otherData: res.otherData
                    }
                    resp.json(JSON.stringify(body));
                    resp.end();
                }
            })
        }
    })
})

// Default get
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html")
});