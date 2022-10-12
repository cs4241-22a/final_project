const router = require("express").Router();
const passport = require("passport");

router.route("/").get(passport.authenticate("github", {scope: ["user:email"]}, null));
router.route("/callback").get(passport.authenticate("github", {failureRedirect: "/login"}, null), (req, res) => {
    // If successful,redirect to homepage
    res.redirect("/");
});

module.exports = router;
