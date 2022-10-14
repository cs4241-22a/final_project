const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("./keys");
const client = require("./mongodbSetup");
const mongo = require("mongodb");

const db = client.db("finalproject");
const collection = db.collection("User");

//Github strategy
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
                Local_user_id: "",
                Local_password: "",
                Friends: [],
                Friend_Request: [],
                Friend_Pending: []
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

//Local strategy
const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};
const verifyCallback = function (username, password, done) {
  console.log("Try to login with", username, password);
  collection
    .findOne({ Local_user_id: username })
    .then((result) => {
      if (result) {
        if (result.Local_password === password) {
          done(null, result);
        } else {
          console.log("wrong password");
          done(null, false);
        }
      } else {
        console.log("no such user");
        done(null, false);
      }
    })
    .catch((err) => console.log(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

//Google strategy
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    function (accessToken, refreshToken, profile, done) {
      collection
        .findOne({ google_id: profile.id })
        .then((result) => {
          if (result) {
            done(null, result);
          } else {
            const username = profile.displayName;
            const google_id = profile.id;
            collection
              .insertOne({
                username: username,
                github_id: "",
                google_id: google_id,
                Local_user_id: "",
                Local_password: "",
                Friends: [],
                Friend_Request: [],
                Friend_Pending: []
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

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  let o_id = new mongo.ObjectId(id);
  collection.findOne({ _id: o_id }).then((user) => {
    done(null, user);
  });
});
