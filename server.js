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
  port = 3000;

app.use(express.static(path.join(__dirname, "build")));
app.use(passport.initialize({}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session({}));

app.listen(process.env.PORT || port);

OutlookStrategy = require("passport-outlook").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      tenant: "589c76f5-ca15-41f9-884b-55ec15a0672a",
      callbackURL: `http://localhost:3000/home`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
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
    console.log(productCollection.find({}).toArray());
    console.log("hi");
  });

app.get("/", (req, res) => {
  res.sendFile("login.html", { user: req.user, root: __dirname });
});

app.get("/home", (req, res) => {
  res.sendFile("index.html", { user: req.user, root: __dirname });
});

app.get(
  "/auth/outlook",
  passport.authenticate("windowslive", {
    scope: [
      "openid",
      "profile",
      "offline_access",
      "https://outlook.office.com/Mail.Read",
    ],
  })
);

app.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
