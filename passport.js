const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.clID,
      clientSecret: process.env.clSe,
      callbackURL: "https://pushbox.glitch.me/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log(profile.displayName);
      return done(null, { name: profile.displayName, id: profile.id });
    }
  )
);
