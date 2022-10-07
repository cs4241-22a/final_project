const router = require("express").Router();
const client = require("../config/mongodbSetup");

const DB = client.db("finalproject");
const collection = DB.collection("User");

const FindUser = async function (collection, _id) {
  try {
    const result = await collection.findOne({ _id: _id });
    return result;
  } catch {
    console.log(err);
  }
};

router.get("/", (req, res) => {
  const _id = req.body._id;
  const result = FindUser(collection, _id);
  console.log(result)
  for (i in result.Friends) {
    console.log("firend is --- ", i);
  }
  res.render('friends')
});

module.exports = router;
