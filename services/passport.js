const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require("../config/keys");
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, rfToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const userData = {
            googleId: profile.id,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
            photo: profile.photos[0].value
        };
        const user = await new User(userData).save();
        return done(null, user);
    })
);


passport.use(
    new FacebookStrategy({
        clientID: keys.facebookAppId,
        clientSecret: keys.facebookAppSecret,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'name', 'gender', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if(existingUser) {
            return done(null, existingUser);
        }

        const userData = {
            facebookId: profile.id,
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
            photo: profile.photos[0].value
        }
        const user = await new User(userData).save();
        return done(null, user);
    }
));