const router = require("express").Router();
const client = require("../config/mongodbSetup");
const passport = require("passport");

const DB = client.db("finalproject");
const collection = DB.collection("User");

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
  passport.authenticate("local", {
    successReturnToOrRedirect: "/app",
    failureRedirect: "/auth/failed",
  })
);

router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.redirect("/app");
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/app");
});

router.get("/failed", (req, res) => {
  res.send("failed to login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  let uname = req.body.uname;
  let pass = req.body.pw;
  if (uname === "") {
    res.render("index", { msg: "Username cannot be empty" });
  } else {
    if (pass === "") {
      res.render("index", { msg: "Password cannot be empty" });
    }
    collection.findOne({ Local_user_id: uname }).then((result) => {
      if (result) {
        res.render("index", { msg: "User Already exists" });
      } else {
        collection
          .insertOne({
            username: uname,
            github_id: "",
            google_id: "",
            Local_user_id: uname,
            Local_password: pass,
            Friends: [],
            Friend_Request: [],
            Friend_Pending: []
          })
          .then((result) => {
            res.render("index", { msg: "New user created plz login" });
          })
          .catch((e) => {
            console.log(`error while insert user /register: ${e}`);
          });
      }
    });
  }
});

module.exports = router;
