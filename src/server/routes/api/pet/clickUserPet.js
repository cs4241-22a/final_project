const Pet = require("../../../models/Pet");

module.exports = async (req, res, next) => {
    const { username: githubUsername } = req.user;
    const initialPet = await Pet.findOne({ githubUsername });
    initialPet.xp += 1;

    const resultPet = await Pet.findOneAndUpdate({ githubUsername }, initialPet);
    res.send(resultPet);
};

