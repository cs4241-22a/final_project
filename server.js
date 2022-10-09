require("dotenv").config();

const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  mongodb = require("mongodb"),
  express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  app = express(),
  path = require("path"),
  port = 3000,
  OutlookStrategy = require("passport-outlook").Strategy;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(express.static(path.join(__dirname, "build")));

app.listen(process.env.PORT || port);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      // tenant: "589c76f5-ca15-41f9-884b-55ec15a0672a",
      callbackURL: `http://localhost:3000/auth/outlook/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Outlook profile is returned
        // to represent the logged-in user.  In a typical application, you would
        // want to associate the Outlook account with a user record in your
        // database, and return that user instead.
        return done(null, profile);
      });
    }
  )
);

// ----------------- Database --------------
const {
  MongoClient,
  ServerApiVersion,
  MongoDBNamespace,
  ObjectId,
} = require("mongodb");
const uri = `mongodb+srv://admin:${process.env.PASS}@${process.env.HOST}`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let userCollection = client.db("GoataShop").collection("Users");
let productCollection = client.db("GoataShop").collection("Products");

client
  .connect()
  .then(() => {
    // will only create collection if it doesn't exist
    return client.db("GoataShop").collection("Users");
  })
  .then((__userCollection) => {
    // store reference to collection
    userCollection = __userCollection;
    // blank query returns all documents
  })
  .then(() => {
    return client.db("GoataShop").collection("Products");
  })
  .then((_productCollection) => {
    productCollection = _productCollection;
  });

app.get("/login", (req, res) => {
  console.log("HI-/login");
  console.log(req.isAuthenticated());
  res.sendFile("login.html", { user: req.user, root: __dirname + "/build/" });
});

// app.get("/", (req, res) => {
//   console.log("HI-/");
//   console.log(req.isAuthenticated());
//   res.sendFile("login.html", { user: req.user, root: __dirname });
// });

app.get("/home", ensureAuthenticated, (req, res) => {
  // console.log(result);
  /**
   * {
  Id: '077a1017-b52f-480f-91b6-5c0dbd2cd0a1@589c76f5-ca15-41f9-884b-55ec15a0672a',
  EmailAddress: 'ekim4@wpi.edu',
  DisplayName: 'Kim, Eri',
  Alias: 'ekim4',
  MailboxGuid: 'a197f5a4-418b-4c88-83a1-39a52fb95d3e'
}
   */
  res.sendFile("index.html", { user: req.user, root: __dirname + "/build/" });
});

app.get("/username", ensureAuthenticated, (req, res) => {
  console.log(req.user._json);
  let user = req.body;
  user.name = req.user._json.DisplayName;
  user.userid = req.user._json.Id;
  user.products = [];
  userCollection.insertOne(req.body);
  res.json(user);
});

// app.post("/home", ensureAuthenticated, (req, res) => {
//   console.log("post----");
//   console.log(req.user);
//   let user = req.body;
//   user.name = req.user.DisplayName;
//   userCollection.insertOne(req.body).then((result) => res.json(result));
// });

app.get("/listings", ensureAuthenticated, (req, res) => {
  console.log(req.user._json.DisplayName);
  res.sendFile("index.html", { user: req.user, root: __dirname + "/build/" });
});

app.get(
  "/auth/outlook",
  passport.authenticate("windowslive", {
    scope: [
      "openid",
      "profile",
      "email",
      "offline_access",
      "https://outlook.office.com/Mail.Read",
    ],
  }),
  function (req, res) {
    // The request will be redirected to Outlook for authentication, so
    // this function will not be called.
  }
);

// GET /auth/outlook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/home");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/home");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
