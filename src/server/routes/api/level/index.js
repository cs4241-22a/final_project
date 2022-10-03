const router = require("express").Router();

router
  .route("/")
  .get(require("./getCurrentLevel"))
  .post(require("./increaseXP"));

module.exports = router;
