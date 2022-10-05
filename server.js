const express = require("express"),
    app = express()

app.use(express.static("public"));

app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@final.nhlyk4z.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let collection = null;
let account = null;

client.connect()
    .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'A3' ).collection( 'Activity Logs' )
    })
    .then( __collection => {
        collection = __collection;
        // blank query returns all documents
        return collection.find({ }).toArray()
    })

    .then( console.log )

    .then( () => {
        return (client.db("A3").collection("accounts"));
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





app.listen(process.env.PORT || 8080);