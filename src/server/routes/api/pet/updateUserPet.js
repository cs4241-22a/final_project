const Pet = require("../../../models/Pet");

module.exports = async (req, res, next) => {
  const { username: githubUsername } = req.user;
  const result = await Pet.findOneAndUpdate({ githubUsername }, {
    "$set": {
      hat: req.body.hat,
      color: req.body.color,
      species: req.body.species,
    }
  });
  res.send(result);
};
