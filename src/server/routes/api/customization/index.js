const router = require("express").Router();

router
  .route("/current")
  .get(require("./getCurrentCustomization"))
  .post(require("./saveNewCustomization"));
router.route("/all").get(require("./getAllCustomizations"));

module.exports = router;
