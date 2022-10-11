const { default: mongoose } = require("mongoose");

const defaultStats = {
  maxHealth: 10,
  currHealth: 10,
  damage: 2,
  gold: 5,
  currLevel: 0,
};

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  playerStats: {
    maxHealth: { type: Number, default: defaultStats.maxHealth },
    currHealth: { type: Number, default: defaultStats.currHealth },
    damage: { type: Number, default: defaultStats.damage },
    gold: { type: Number, default: defaultStats.gold },
    currLevel: { type: Number, default: defaultStats.currLevel },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;