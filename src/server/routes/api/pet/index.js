const router = require("express").Router();

router.route("/").get(require("./getUserPet")).post(require("./updateUserPet"));

module.exports = router;
