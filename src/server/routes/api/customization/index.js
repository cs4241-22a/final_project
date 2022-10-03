const router = require("express").Router();

router.route("/").post(require("./saveNewCustomization"));
router.route("/:level").get(require("./getAvailableCustomizations"));

module.exports = router;
