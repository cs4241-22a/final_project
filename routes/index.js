var express = require('express');
var router = express.Router();
//const Note = require("../models/Note");
const mongodb = require("mongodb");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ReactionTests', user : req.user});
});



// router.post('/edit', function (req, res, next) {
//   console.log("Edit: %s", req.body)
//   Note.updateOne({_id: new mongodb.ObjectID(req.body._id)}, {note: req.body.note}, {}, () => {
//     Note.find({owner_id: req.body.owner_id}).lean().exec(function (err, notes) {
//       console.log("Found notes: %s", notes);
//       res.json(notes)
//     })
//   })
// });
//
// router.post('/delete', function (req, res, next) {
//   console.log("Delete: %s", req.body)
//   Note.deleteOne({_id: new mongodb.ObjectID(req.body._id)}, {}, (err, doc, result) => {
//     console.log(err);
//     console.log(doc);
//     console.log(result);
//     Note.find({owner_id: req.body.owner_id}).lean().exec(function (err, notes) {
//       console.log("Found notes: %s", notes);
//       res.json(notes)
//     })
//   })
// });
//
// router.post('/getNotes', function (req, res, next) {
//   Note.find({owner_id: req.body.owner_id}).lean().exec(function (err, notes) {
//     console.log("Found notes: %s", notes);
//     res.json(notes)
//   })
// })




module.exports = router;
