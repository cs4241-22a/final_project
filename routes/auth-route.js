const router = require("express").Router();
const passport = require("passport");

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.redirect('/app');
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
