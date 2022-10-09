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

module.exports.ID_to_Uname = async function (collection,_id) {
  try {
    const result = await collection.findOne({ _id: _id });
    return result.username;
  } catch {
    console.log(err);
  }
};

module.exports.FindUsersUsername = async function (collection, Username) {
  const options = {
    sort: { title: 1 },
  };
  const query = { username: Username };
  try {
    let cursor = await collection.find(query, options);
    if ((await cursor.count()) === 0) {
      return false;
    } else {
      return cursor;
    }
  } catch {
    (err) => console.log(err);
  }
};
