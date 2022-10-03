const router = require("express").Router();

router
  .route("/")
  .post(require("./saveNewCustomization"))
  .get(require("./getAllCustomizations"));

module.exports = router;
