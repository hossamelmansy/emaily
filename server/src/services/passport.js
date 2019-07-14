const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  var user = await User.findById(id).exec();
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async function(accessToken, refreshToken, profile, done) {
      var existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        done(null, existingUser);
      } else {
        let user = await User.create({ googleId: profile.id });
        done(null, user);
      }
    }
  )
);
