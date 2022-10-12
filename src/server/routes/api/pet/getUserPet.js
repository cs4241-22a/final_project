const Pet = require("../../../models/Pet");

module.exports = async (req, res, next) => {
  const { username: githubUsername } = req.user;
  const pet = await Pet.findOne({ githubUsername });
  res.send(pet);
};
