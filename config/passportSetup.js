const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const keys = require("./keys");
const client = require("./mongodbSetup");
const mongo = require("mongodb");

const db = client.db("finalproject");
const collection = db.collection("User");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  let o_id = new mongo.ObjectId(id);
  collection.findOne({ _id: o_id }).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      callbackURL: "/auth/github/redirect",
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
    },
    function (accessToken, refreshToken, profile, done) {
      collection
        .findOne({ github_id: profile.id })
        .then((result) => {
          if (result) {
            console.log("user is: ", result.username);
            console.log("user id is: ", result._id);
            done(null, result);
          } else {
            const username = profile.username;
            const github_id = profile.id;
            collection
              .insertOne({
                username: username,
                github_id: github_id,
                google_id: "",
              })
              .then((newUser) => {
                newUser._id = newUser.insertedId;
                console.log("New User created:", newUser);
                done(null, newUser);
              })
              .catch((e) => {
                console.log(`error while insert user: ${e}`);
              });
          }
        })
        .catch((e) => {
          console.log(`error while find user: ${e}`);
        });
    }
  )
);
