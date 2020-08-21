const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// .use to specify the LocalStrategy
exports.local = passport.use(new LocalStrategy(User.authenticate())); 
// when a user has been successfully verified. The data needs to be grabed from the session to be added to the request object
passport.serializeUser(User.serializeUser()); // reseve data from the req obj to then convert it to store the data
passport.deserializeUser(User.deserializeUser());
