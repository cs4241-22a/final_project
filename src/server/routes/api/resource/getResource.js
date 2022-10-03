const Resource = require("../../../models/Resource");

module.exports = async (req, res, next) => {
  const { resourceType, resourceID } = req.params;
  const resource = await Resource.findOne({ resourceType, resourceID });
  if (resource == null) {
    res.status(404).send({
      msg: `Could not find the resource ${resourceType}:${resourceID}`,
    });
  } else {
    res.send(resource);
  }
};
