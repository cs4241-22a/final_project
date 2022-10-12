const mongoose = require("mongoose");

const Resource = new mongoose.Schema({
    resourceType: String,
    resourceID: Number,
    filePath: String,
    unlockLevel: Number,
    color: String
});
const model = mongoose.model("Resource", Resource);

module.exports = model;
