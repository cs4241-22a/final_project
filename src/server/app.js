const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const routes = require("./routes");

const app = express();
const port = process.env.PORT | 3000;

// Connect to database
(async () => {
  mongoose.connection.on("open", () =>
    console.log("Connected to MongoDB instance")
  );
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}/?retryWrites=true&w=majority`
  );
})();

// Passport setup
/*
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
*/

// Middleware
/*
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
*/
app.use(routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));