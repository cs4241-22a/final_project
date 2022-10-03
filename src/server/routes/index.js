const router = require("express").Router();
const bodyParser = require("body-parser");
const morgan = require("morgan");

router.use("/api", morgan("tiny"), bodyParser.json(), require("./api"));
router.use("/auth", require("./auth/github"));

module.exports = router;
