const router = require("express").Router();
const client = require("../config/mongodbSetup");
const Utils = require("../Utils/Utils.js");
const moment = require('moment');

const DB = client.db("finalproject");
const collection = DB.collection("Data");

router.get("/", (req, res) => {
  collection
    .find({ User_MongoDB_id: req.user._id })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.render("application", { msg: "", body: result, moment: moment});
      }
    });
});

router.post("/add_plan", (req, res) => {
  let _id = req.user._id;
  let Note = req.body.note;

  let STime = req.body.start_time;
  let M_STime = moment(STime)

  let ETime = req.body.end_time;
  let M_ETime = moment(ETime)

  let Submit_Time = req.body.submit_time;
  let data = { User_MongoDB_id: _id, Note: Note, Start_Time: M_STime, End_Time: M_ETime, Submit_Time: Submit_Time };
  collection
    .insertOne(data)
    .then((result) => {
      console.log(`Doc with new ID: ${result.insertedId} added`);
      res.redirect("/app");
    })
    .catch((err) => console.log("Insertion failed : /add_plan", err));
});

router.post("/delete_plan", (req, res) => {
  let id = req.body._id;
  let o_id = Utils.toMongodbOBJ(id);
  collection
    .deleteOne({ _id: o_id })
    .then((deleted) => {
      console.log("One document deleted");
      res.redirect("/app");
    })
    .catch((err) => console.log(`/delete_plan failed: ${err}`));
});

module.exports = router;
