const mongo = require("mongodb");

module.exports.toMongodbOBJ = function (id) {
  let o_id = new mongo.ObjectId(id);
  return o_id;
};

module.exports.FindUserID = async function (collection, _id) {
  try {
    const result = await collection.findOne({ _id: _id });
    return result;
  } catch {
    console.log(err);
  }
};
