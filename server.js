console.log("Starting Server...")
require('dotenv').config()

/**
 * Loading Node Modules
 */
const express = require('express'),
      mongodb  = require('mongodb'),
      path = require('path'),
      
      app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(express.static('public'))
app.use(express.static('views'))
app.use(express.json())

/**
 * MongoDB setting up connection variables
 */

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/**
 * MongoDB Connecting to database
 */
let collection = null;

client.connect()
  .then(() => {
    return client.db('ClimbingMap').collection('climbs')
  })
  .then(__collection => {
     collection = __collection;
  })
/**
 * When user want's all route entries
 */
app.get('/routes', (req, res) => {
  let routes = []
  collection.find()
    .toArray()
    .then(result => res.json(result))
})

// /**
//  * When new data is submitted
//  */
//  app.post( '/addRoute', (req,res) => {
//   // assumes only one object to insert
//   let body = {_id:mongodb.ObjectId(),
//               grade: req.body.grade,
//               color:req.body.color,
//               section:req.body.section,
//               type:req.body.section,
//               canLead:req.body.section,
//               canTopRope:req.body.section,
//             }

//   collection.updateOne({_id:mongodb.ObjectId(req.session.passport.user)}, 
//                        {$push:{items:body}})
//             .then(result => res.json(result))
// })

// /**
//  * Handle Data Deletion
//  */
//  app.post( '/removeRoute', (req,res) => {
  
//   collection
//     .updateOne(
//       {_id:mongodb.ObjectId( req.session.passport.user)},
//       {$pull: {items: {_itemID:mongodb.ObjectId(req.body._itemID)}}}
//     ).then(result => res.json(result))
// })


app.listen(3000)
