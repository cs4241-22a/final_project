const mongoose = require("mongoose");

const Pet = new mongoose.Schema({
  name: String,
  hat: Number,
  color: Number,
  species: Number,
  level: Number,
  xp: Number,
  githubUsername: String,
});
const model = mongoose.model("Pet", Pet);

module.exports = model;
