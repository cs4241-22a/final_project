const router = require("express").Router();

router.route("/github").use(require("./github"));

module.exports = router;
