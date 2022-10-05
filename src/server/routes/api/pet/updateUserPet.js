const Pet = require("../../../models/Pet");

module.exports = async (req, res, next) => {
  //const { username: githubUsername } = req.user;
  const githubUsername = "test_github_user";
  const result = await Pet.findOneAndUpdate({ githubUsername }, req.body, {
    new: true,
  });
  res.send(result);
};
