const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config({path: path.join(__dirname, "../../.env")});
const routes = require("./routes");
const morgan = require("morgan");
const isLoggedIn = require("./middleware/isLoggedIn");
const connectionChecker = require("./middleware/connectionChecker");
const Pet = require("./models/Pet");
const getRandomName = require("./models/Utility");
const cors = require("cors");
const MongoStore = require("connect-mongo");

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
passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER}/auth/github/callback`,
        }, async (accessToken, refreshToken, profile, done) => {
            const pet = await Pet.find({githubUsername: profile._json.login});
            if (pet === undefined || pet.length === 0) {
                console.log("Saving new default pet for " + profile._json.login);
                const defaultPet = new Pet({
                    githubUsername: profile._json.login,
                    name: getRandomName(),
                    color:"gray",
                    hat:-1,
                    level:1,
                    xp:0,
                    species:0,
                    xpToNextLevel:20,
                });
                await defaultPet.save();
            }
            return done(null, profile);
        }
    )
);

// Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({client: mongoose.connection.getClient()}),
    })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("tiny"))
app.use(isLoggedIn);
app.use(connectionChecker);
app.use(routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
