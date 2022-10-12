const mongoose = require("mongoose");

const Pet = new mongoose.Schema({
    name: String,
    hat: Number,
    color: String,
    species: Number,
    level: Number,
    xp: Number,
    xpToNextLevel: Number,
    githubUsername: {type: String, unique: true},
});
const model = mongoose.model("Pet", Pet);

module.exports = model;
