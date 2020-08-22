const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const config = require('./config.js');

// .use to specify the LocalStrategy and the varified callback function User.authenticate()
exports.local = passport.use(new LocalStrategy(User.authenticate()));
// when a user has been successfully verified. The data needs to be grabed from the session to be added to the request object
passport.serializeUser(User.serializeUser()); // reseve data from the req obj to then convert it to store the data
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

const opts = {};
// specifices how the json web token should be extracted/sent from the req message (chose to be extracted by the header instead of the body or another place)
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// option that lets us supply the JWT with a key signed as token and setting that to the config.secretKey in config.js
opts.secretOrKey = config.secretKey;

// exporting JWT strategy
exports.jwtPassport = passport.use(
  new JwtStrategy( // new JWT constructor
    opts, // object with config options
    // verified callback function
    (jwt_payload, done) => {
      console.log('JWT payload:', jwt_payload);
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false); // second argument false = for no user was found
        } else if (user) {
          return done(null, user); // argument for no error and user doc to load to the req obj
        } else {
          return done(null, false); // no error or user
        }
      });
    }
  )
);

// shortcut for authenticating with JWT
exports.verifyUser = passport.authenticate('jwt', { session: false });
