const router = require("express").Router();

router.route("/:level").get(require("./getAvailableCustomizations"));

module.exports = router;
