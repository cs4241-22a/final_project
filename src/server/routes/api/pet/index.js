const router = require("express").Router();

router.route("/").get(require("./getUserPet")).post(require("./updateUserPet"));
router.post("/click", require("./clickUserPet"));

module.exports = router;
