const router = require("express").Router();

router.route("/").get((req, res) => {});
router.route("/callback").get((req, res) => {});

module.exports = router;
