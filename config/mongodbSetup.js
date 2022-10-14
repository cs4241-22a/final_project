const { MongoClient, ServerApiVersion } = require("mongodb");
const keys = require("./keys");
const uri = `mongodb+srv://WebwareCS4241:${keys.Database.Password}@finalproject.wosains.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;
