const router = require("express").Router();

router.use("/customization", require("./customization"));
router.use("/level", require("./level"));
router.use("/resource", require("./resource"));

module.exports = router;
