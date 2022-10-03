const router = require("express").Router();

router.route("/").post(require("./increaseXP"));

module.exports = router;
