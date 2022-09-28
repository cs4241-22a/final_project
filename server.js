const express = require("express");
const passportSetup = require('./config/passportSetup');
const passport = require("passport");
const AppRoute = require("./routes/app-route");
const AuthRoute = require("./routes/auth-route");
const cookieSession = require("cookie-session");
const client = require("./config/mongodbSetup");
const keys = require('./config/keys');
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.use(
  cookieSession({
    keys: [keys.Cookie.key],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", AuthRoute);
app.use("/app", AppRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Now listening port: ${PORT}`);
});
