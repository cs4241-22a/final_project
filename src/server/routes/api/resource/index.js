const router = require("express").Router();

router.route("/:resourceType/:resourceID").get(require("./getResource"));

module.exports = router;
