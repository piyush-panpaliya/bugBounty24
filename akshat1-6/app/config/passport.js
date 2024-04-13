require('dotenv').config();
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const callbackuri =
  process.env.NODE_ENV === 'production'
    ? process.env.CALLBACK_URL
    : 'http://localhost:8083/auth/google/callback';
const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: callbackuri,
    userProfileUrl: 'https://www.googleapis.com.oauth2.v3.userinfo',
  },
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate(
      { username: profile.id },
      {
        name: profile._json.name,
        pic: profile._json.picture,
        email: profile._json.email,
      },
      function (err, user) {
        console.log(profile.displayName);
        return cb(err, user);
      }
    );
  }
);

module.exports = strategy;
