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
let collection = null;

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
app.get("/cart-data", (req, resp) => {
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
            const cartCode = req.query["cart"];
            console.log("Fetching cart: " + cartCode);
            db.collection("carts").findOne({"code": cartCode}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res || !res.cannedJarredData) {
                        resp.status(404);
                        resp.end();
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
                        resp.status(200);
                        resp.end();
                    }
                }
            })
        }
    })
})

app.get("/home-cart", (req, resp) => {
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
            const cartCode = req.query["cart"];
            console.log("Fetching cart: " + cartCode);
            db.collection("users").findOne({"_id": userId}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    if (!res) {
                        resp.status(404);
                        resp.end();
                    } else {
                        // Found user document
                        const body = {
                            homeCart: res.homeCart
                        }
                        resp.json(JSON.stringify(body));
                        resp.status(200);
                        resp.end();
                    }
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
            db.collection("carts").findOne({"code": data.cartCode}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    // Found user document
                    // Edit correct field 
                    let array = null;
                    let field = null;
                    switch(data.itemType) {
                        case itemTypes.CANNEDJARRED:
                            array = res.cannedJarredData;
                            field = "cannedJarredData";
                            break;
                        case itemTypes.DAIRY:
                            array = res.dairyData;
                            field = "dairyData";
                            break;
                        case itemTypes.DRYBAKING:
                            array = res.dryBakingData;
                            field = "dryBakingData";
                            break;
                        case itemTypes.FROZEN:
                            array = res.frozenData;
                            field = "frozenData";
                            break;
                        case itemTypes.GRAINS:
                            array = res.grainsData;
                            field = "grainsData";
                            break;
                        case itemTypes.MEAT:
                            array = res.meatData;
                            field = "meatData";
                            break;
                        case itemTypes.PRODUCE:
                            array = res.produceData;
                            field = "produceData";
                            break;
                        case itemTypes.OTHER:
                            array = res.otherData;
                            field = "otherData";
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
                    db.collection("carts").updateOne({"code": data.cartCode}, { $set: {[field]: array} }, (err, result) => {
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
            db.collection("carts").findOne({"code": data.cartCode}, {}, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    // Found user document
                    // Edit correct field 
                    let array = null;
                    let field = null;
                    switch(data.itemType) {
                        case itemTypes.CANNEDJARRED:
                            array = res.cannedJarredData;
                            field = "cannedJarredData";
                            break;
                        case itemTypes.DAIRY:
                            array = res.dairyData;
                            field = "dairyData";
                            break;
                        case itemTypes.DRYBAKING:
                            array = res.dryBakingData;
                            field = "dryBakingData";
                            break;
                        case itemTypes.FROZEN:
                            array = res.frozenData;
                            field = "frozenData";
                            break;
                        case itemTypes.GRAINS:
                            array = res.grainsData;
                            field = "grainsData";
                            break;
                        case itemTypes.MEAT:
                            array = res.meatData;
                            field = "meatData";
                            break;
                        case itemTypes.PRODUCE:
                            array = res.produceData;
                            field = "produceData";
                            break;
                        case itemTypes.OTHER:
                            array = res.otherData;
                            field = "otherData";
                            break;
                        default:
                            array = null;
                            field = null;
                            break;
                    }
                    if (!array) {
                        resp.status(404);
                        resp.end();
                    }
                    array = array.filter(i => i !== data.itemName);
                    db.collection("carts").updateOne({"code": data.cartCode}, { $set: {[field]: array} }, (err, result) => {
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
                                    homeCart: res.homeCart,
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
    client.connect(async (err, client) => {
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
                        // Hash pass
                        console.log("hashing pass...");
                        bcrypt.hash(data.password, saltRounds, async function(err, hash) {
                            const c = makeCode();
                            let success = await createCartFromCode(c);
                            if (success) {
                                const newUser = {
                                    email: data.email,
                                    password: hash,
                                    homeCart: c,
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
                            } else {
                                resp.status(400);
                                resp.json(JSON.stringify({error: true, code: null}));
                                resp.end();
                            }
                        })
                    }
                }
            })
        }
    })
});

function makeCode() {
    var code = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

app.post("/create-cart", async (req, resp) => {
    console.log("Creating a new cart...");
    const c = makeCode();
    let success = await createCartFromCode(c);
    if (success) {
        resp.status(200);
        resp.json(JSON.stringify({error: false, code: c}));
        resp.end();
    } else {
        resp.status(400);
        resp.json(JSON.stringify({error: true, code: null}));
        resp.end();
    }
})

async function createCartFromCode(code) {
    return new Promise((resolve, reject) => {
        client.connect((err, client) => {
            if (err) {
                throw err;
            } else {
                // Connection succeeded
                const newCart = {
                    code: code,
                    cannedJarredData: [],
                    dairyData: [],
                    dryBakingData: [],
                    frozenData: [],
                    grainsData: [],
                    meatData: [],
                    produceData: [],
                    otherData: []
                }
                const db = client.db("database");
                db.collection("carts").insertOne(newCart, (err, res) => {
                    // Insert to DB
                    if (err) {
                        throw err;
                    } else {
                        console.log("New cart sent to database!");
                        resolve(true);
                    }
                });
            }
        })
    });
}

// Serve React build
app.use(express.static(__dirname + "/client/build"));
// Serve react app
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});