const router = require("express").Router();
const client = require("../config/mongodbSetup");
const Utils = require('../Utils/Utils.js');
const moment = require('moment');

const DB = client.db("finalproject");
const collection = DB.collection("Data");

router.get("/", (req, res) => {
  res.redirect('/friends')
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const M_id = Utils.toMongodbOBJ(id)
  collection
    .find({ User_MongoDB_id: M_id })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.render("seefriends", { msg: `Friend ${id}`, body: result, moment: moment});
      }
    });
});

module.exports = router;
