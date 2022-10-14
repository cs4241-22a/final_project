const express = require("express");
const passportSetup = require('./config/passportSetup');
const session = require('express-session');
const passport = require("passport");
const AppRoute = require("./routes/app-route");
const AuthRoute = require("./routes/auth-route");
const FriendPlanRoute = require('./routes/friendplan-route')
const cookieSession = require("cookie-session");
const client = require("./config/mongodbSetup");
const FriendsRoute = require('./routes/firends-route')
const keys = require('./config/keys');
const path = require("path");
const RealTimeChatRoute = require('./routes/RealTimeChat-route');
const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: keys.Cookie.key,
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
  }
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req,res)=> {
  res.render('index', {msg: ''});
})

app.use("/auth", AuthRoute);
app.use("/app", AppRoute);
app.use('/friends', FriendsRoute);
app.use('/friendplan', FriendPlanRoute);
app.use('/rtchat', RealTimeChatRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Now listening port: ${PORT}`);
});
