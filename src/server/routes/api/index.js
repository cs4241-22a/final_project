const router = require("express").Router();

router.use("/customization", require("./customization"));
router.use("/resource", require("./resource"));
router.use("/pet", require("./pet"));

module.exports = router;
