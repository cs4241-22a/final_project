const Resource = require("../../../models/Resource");

module.exports = async (req, res, next) => {
  const { level } = req.params;
  const hats = await Resource.find({ resourceType: "HAT", unlockLevel: { $lte: level } });
  const colors = await Resource.find({ resourceType: "COLOR", unlockLevel: { $lte: level } });
  const species = await Resource.find({ resourceType: "SPECIES", unlockLevel: { $lte: level } });

  const resources = {
    hats,
    colors,
    species,
  }
  res.send(resources);
};
