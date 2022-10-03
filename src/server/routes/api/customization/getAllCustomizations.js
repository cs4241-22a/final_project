const Resource = require("../../../models/Resource");

module.exports = async (req, res, next) => {
  const resources = await Resource.find();
  res.send(resources);
};
