const router = require("express").Router();
const client = require("../config/mongodbSetup");

const DB = client.db("finalproject");
const collection = DB.collection("Data");

router.get("/", (req, res) => {
  collection
    .find({ User_MongoDB_id: req.user._id })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.render("application", { msg: "", body: JSON.stringify(result) });
      }
    });
});

router.post("/add_plan", (req, res) => {
  let _id = req.user._id;
  let Note = req.body.note;
  let Time = req.body.time;
  let data = { User_MongoDB_id: _id, Note: Note, Time: Time };
  collection
    .insertOne(data)
    .then((result) => {
      console.log(`Doc with new ID: ${result.insertedId} added`);
      res.redirect("/app");
    })
    .catch((err) => console.log("Insertion failed : /add_plan", err));
});

module.exports = router;
