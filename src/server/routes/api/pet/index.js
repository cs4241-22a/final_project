const router = require("express").Router();

router.route("/").get(require("./getUserPet"));

module.exports = router;
