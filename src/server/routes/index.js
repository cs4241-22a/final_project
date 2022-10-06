const router = require("express").Router();
const bodyParser = require("body-parser");
const path = require("path");
const Pet = require("../models/Pet");

router.use("/api", bodyParser.json(), require("./api"));
router.use("/auth", require("./auth"));

router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect("/");
    })
});

module.exports = router;
