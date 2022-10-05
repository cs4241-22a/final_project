const express = require( 'express' ),
    session = require('express-session'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github2').Strategy,
    util = require('util'), // todo maybe not
    path = require('path'),
    app = express()
	favicon = require('serve-favicon')

//.env setup
require('dotenv').config()
let GITHUB_CLIENT_ID = `${process.env.GITHUB_CLIENT_ID}`;
let GITHUB_CLIENT_SECRET = `${process.env.GITHUB_CLIENT_SECRET}`;
let CALLBACK_URL = `${process.env.CALLBACK_URL}`;



// ---
// Middleware
// ---

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
));

// passportjs + express-session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

app.use( express.json() )

//not in crome apparently
app.use(favicon(path.join(__dirname, 'public/factorio.ico')))

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));



// ---
// ROUTES
// ---
app.get('/', function(req, res) {
    if (req.hasOwnProperty('user')) {
        console.log('A user is logged in!');
        console.log(req.user);
    }
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/login.html'))
});

// todo, this is example of logged-in only page.
app.get('/account', ensureAuthenticated, function(req, res){
    console.log("User Requesting /account")
    console.log(req.user)
    res.sendFile(path.join(__dirname, '/build/account.html'))
});

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login?github-auth-failed' }),
    function(req, res) {
        res.redirect('/');
    });

app.listen(process.env.PORT || 3000 )