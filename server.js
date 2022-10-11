require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const helmet = require('helmet');
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');

const saltRounds = 10;

const itemTypes = {
    CANNEDJARRED: "Canned / Jarred Goods",  // "canned-jarred"
    DAIRY: "Dairy",                         // "dairy"
    DRYBAKING: "Dry / Baking Goods",        // "dry-baking"
    FROZEN: "Frozen",                       // "frozen"
    GRAINS: "Grains",                       // "grains"
    MEAT: "Meat",                           // "meat"
    PRODUCE: "Produce",                     // "produce"
    OTHER: "Other",                         // "other"
}

const uri = 'mongodb+srv://goGrocery:onCTPMLKBjCDBp40@cluster0.ptctsas.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true,});
let collection = null

// Init express application
const app = express();

const sessions = new Map();

// Start listening on defined port
app.listen(process.env.PORT || 3000, () => {
    console.log('Now listening on port ' + process.env.PORT || 3000);
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet({
    crossOriginEmbedderPolicy: false
}));

// Get routes
app.get("/user-data", (req, resp) => {
    // Fetch user data from DB

    const sessionId = req.cookies.session.substring(1);
    const userId = sessions.get(sessionId);
    if (!userId) {
        resp.status(401);
        resp.end();
    }
    console.log("Session valid. getting user data")
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            // If DB connection is successful
            const db = client.db("database");
            db.collection("users").findOne({"_id": userId}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res || !res.userData) {
                        resp.status(404);
                        resp.end();
                    }
                    // Found user document
                    const body = {
                        cannedJarredData: res.userData.cannedJarredData,
                        dairyData: res.userData.dairyData,
                        dryBakingData: res.userData.dryBakingData,
                        frozenData: res.userData.frozenData,
                        grainsData: res.userData.grainsData,
                        meatData: res.userData.meatData,
                        produceData: res.userData.produceData,
                        otherData: res.userData.otherData
                    }
                    resp.json(JSON.stringify(body));
                    resp.status(200);
                    resp.end();
                }
            })
        }
    })
})

app.post("/add-item", (req, resp) => {
    const data = req.body;
    if (!data) { // Guard clause
        resp.end();
    }

    const sessionId = req.cookies.session.substring(1);
    const userId = sessions.get(sessionId);
    if (!userId) {
        resp.status(401);
        resp.end();
    }
    console.log("Session valid. Adding item")

    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            // If DB connection is successful
            const db = client.db("database");
            db.collection("users").findOne({"_id": userId}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    // Found user document
                    // Edit correct field 
                    let array = null;
                    let field = null;
                    switch(data.itemType) {
                        case itemTypes.CANNEDJARRED:
                            array = res.userData.cannedJarredData;
                            field = "userData.cannedJarredData";
                            break;
                        case itemTypes.DAIRY:
                            array = res.userData.dairyData;
                            field = "userData.dairyData";
                            break;
                        case itemTypes.DRYBAKING:
                            array = res.userData.dryBakingData;
                            field = "userData.dryBakingData";
                            break;
                        case itemTypes.FROZEN:
                            array = res.userData.frozenData;
                            field = "userData.frozenData";
                            break;
                        case itemTypes.GRAINS:
                            array = res.userData.grainsData;
                            field = "userData.grainsData";
                            break;
                        case itemTypes.MEAT:
                            array = res.userData.meatData;
                            field = "userData.meatData";
                            break;
                        case itemTypes.PRODUCE:
                            array = res.userData.produceData;
                            field = "userData.produceData";
                            break;
                        case itemTypes.OTHER:
                            array = res.userData.otherData;
                            field = "userData.otherData";
                            break;
                        default:
                            array = null;
                            field = null;
                            break;
                    }
                    if (!array) {
                        resp.end();
                    }
                    console.log("Array valid");
                    array.push(data.itemName);
                    db.collection("users").updateOne({"_id": userId}, { $set: {[field]: array} }, (err, result) => {
                        console.log(result);
                        if (err) {
                            throw err;
                        } else {
                            resp.status(200);
                            resp.end();
                        }
                    });
                }
            })
        }
    })
})

app.post("/remove-item", (req, resp) => {
    const data = req.body;
    if (!data) { // Guard clause
        resp.end();
    }

    const sessionId = req.cookies.session.substring(1);
    const userId = sessions.get(sessionId);
    if (!userId) {
        resp.status(401);
        resp.end();
    }
    console.log("Session valid. Removing item")
    
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            // If DB connection is successful
            const db = client.db("database");
            db.collection("users").findOne({"_id": userId}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    // Found user document
                    // Edit correct field 
                    let array = null;
                    let field = null;
                    switch(data.itemType) {
                        case itemTypes.CANNEDJARRED:
                            array = res.userData.cannedJarredData;
                            field = "userData.cannedJarredData";
                            break;
                        case itemTypes.DAIRY:
                            array = res.userData.dairyData;
                            field = "userData.dairyData";
                            break;
                        case itemTypes.DRYBAKING:
                            array = res.userData.dryBakingData;
                            field = "userData.dryBakingData";
                            break;
                        case itemTypes.FROZEN:
                            array = res.userData.frozenData;
                            field = "userData.frozenData";
                            break;
                        case itemTypes.GRAINS:
                            array = res.userData.grainsData;
                            field = "userData.grainsData";
                            break;
                        case itemTypes.MEAT:
                            array = res.userData.meatData;
                            field = "userData.meatData";
                            break;
                        case itemTypes.PRODUCE:
                            array = res.userData.produceData;
                            field = "userData.produceData";
                            break;
                        case itemTypes.OTHER:
                            array = res.userData.otherData;
                            field = "userData.otherData";
                            break;
                        default:
                            array = null;
                            field = null;
                            break;
                    }
                    if (!array) {
                        resp.end();
                    }
                    array = array.filter(i => i !== data.itemName);
                    db.collection("users").updateOne({"_id": userId}, { $set: {[field]: array} }, (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            const body = {
                                error: false
                            }
                            resp.json(JSON.stringify(body));
                            resp.end();
                        }
                    });
                }
            })
        }
    })
})

app.post("/login", (req, resp) => {
    // Check email and password
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            // Connection succeeded
            const db = client.db("database");
            db.collection("users").findOne({"email": data.email}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (res) {
                        // User exists
                        const hash = res.password;
                        bcrypt.compare(data.password, hash, (err, bcryptRes) => {
                            // Check if password is right
                            if (bcryptRes) {
                                const body = {
                                    error: false,
                                }
                                const sessionId = uuidv4();
                                sessions.set(sessionId, res._id);
                                resp.set("Set-Cookie", 'session=$' + sessionId);
                                resp.json(JSON.stringify(body));
                                console.log("user authenticated");
                                resp.end();
                            } else {
                                const body = {
                                    error: true
                                }
                                resp.json(JSON.stringify(body));
                                resp.end();
                            }
                        })
                    } else {
                        const body = {
                            error: true
                        }
                        console.log("User does not exist.");
                        resp.json(JSON.stringify(body));
                        resp.end();
                    }
                }
            })
        }
    })
})

app.post("/register", (req, resp) => {
    console.log("Registering new user...");
    const data = req.body;
    client.connect((err, client) => {
        if (err) {
            throw err;
        } else {
            // Connection succeeded
            const db = client.db("database");
            db.collection("users").findOne({"email": data.email}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (res) {
                        const body = {
                            error: true
                        }
                        console.log("User already exists.");
                        resp.json(JSON.stringify(body));
                        resp.end();
                    } else {
                        bcrypt.hash(data.password, saltRounds, function(err, hash) {
                            // Hash pass
                            const newUser = {
                                email: data.email,
                                password: hash,
                                userData: {
                                    cannedJarredData: [],
                                    dairyData: [],
                                    dryBakingData: [],
                                    frozenData: [],
                                    grainsData: [],
                                    meatData: [],
                                    produceData: [],
                                    otherData: []
                                }
                            }
                            db.collection("users").insertOne(newUser, (err, res) => {
                                // Insert to DB
                                if (err) {
                                    throw err;
                                } else {
                                    console.log("New user data sent to database!");
                                    const body = {
                                        error: false,
                                    }
                                    resp.json(JSON.stringify(body));
                                    resp.end();
                                }
                            });
                        })
                    }
                }
            })
        }
    })
})

// Serve React build
app.use(express.static(__dirname + "/client/build"));
// Serve react app
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});