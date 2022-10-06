const router = require("express").Router();
const passport = require("passport");

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.post(
  "/local",
  passport.authenticate('local', {
    successReturnToOrRedirect: '/app',
    failureRedirect: '/auth/failed',
  })
);

router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.redirect("/app");
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/app");
});

router.get('/failed', (req,res)=> {
  res.send('failed to login')
})

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
