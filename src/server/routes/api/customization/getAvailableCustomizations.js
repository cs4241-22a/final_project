const Resource = require("../../../models/Resource");

module.exports = async (req, res, next) => {
  const { level } = req.params;
  const resources = await Resource.find({ unlockLevel: { $lte: level } });
  res.send(resources);
};
