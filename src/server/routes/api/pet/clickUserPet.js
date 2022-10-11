const Pet = require("../../../models/Pet");

module.exports = async (req, res, next) => {
    const { username: githubUsername } = req.user;
    const initialPet = await Pet.findOne({ githubUsername });
    initialPet.xp += 1;

    if(initialPet.xp >= initialPet.xpToNextLevel) {
        initialPet.level += 1;
        initialPet.xp = 0;
        initialPet.xpToNextLevel = Math.floor(initialPet.xpToNextLevel * 1.45);
    }

    const resultPet = await Pet.findOneAndUpdate({ githubUsername }, initialPet);
    res.send(resultPet);
};

