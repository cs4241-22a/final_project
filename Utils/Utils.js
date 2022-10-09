const mongo = require("mongodb");

module.exports.toMongodbOBJ = function(id) {
    let o_id = new mongo.ObjectId(id);
    return o_id;
}