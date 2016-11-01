var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy; // Strategy for local authentication
var session = require("express-session");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require("./user");

var PORT = 8888;

app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    "secret": "node secret key test",    // session secret key for encryption
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }  // valid for 600 seconds
}));
app.use(passport.initialize());
app.use(passport.session());

// middleware inside passport (strategy) named local
passport.use('local', new localStrategy(
    function (username, password, done) {

        if(username == "anubhav"){  // authentication valid or true
            done(null, username);
        }
        else{                      // authentication invalid or falses
            done(null, false);
        }
    }
));

// second argument of done in 'local' (JSON object) is 'user' here
passport.serializeUser(function(id, done) {
    console.log("serialize");
    console.log(id);
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    console.log("deserialize");

    User.findOne({"profileId": id}, function (err, result) {
        if(err)
            throw err;
        console.log(result);
        done(null, result);
    });
});



passport.use(new GoogleStrategy({
        clientID: '598283688898-0c5suq41l11mok5pef1dil5qbbe9pafv.apps.googleusercontent.com',
        clientSecret: 'z_eyjooD6ENzQSTt7fBkP3IN',
        callbackURL: "http://localhost:8888/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile.id);
        User.findOrCreate({ "profileId": profile.id }, {
            "image": profile._json.image.url,
            "name": profile._json.displayName
        }, function (err, user) {
            return done(err, user.profileId);
        });
    }
));


//Apis
app.get("/", isAuthenticated, function (req, res) {
    res.send("<h1>"+req.user.name+"</h1><img src='"+req.user.image+"'>");
});

app.post("/login", passport.authenticate("local"), function (req, res) {
    res.send("logged in");
});

app.get("/google", passport.authenticate("google", {scope: ['email']} ));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.send(req.user);
    });

app.listen(PORT, function (req, res) {
   console.log("server started"+PORT);
});

function isAuthenticated(req, res, done) {

    if(req.user){
        done();
    }else {
        res.send("un-authorized");
    }
}