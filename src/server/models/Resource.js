const mongoose = require("mongoose");

const Resource = new mongoose.Schema({
    resourceType: String,
    resourceID: Number,
    filePath: String,
    unlockLevel: Number,
});
const model = mongoose.model("Resource", Resource);

module.exports = model;
