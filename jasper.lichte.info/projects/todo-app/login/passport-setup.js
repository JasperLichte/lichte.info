const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { passport: passportCredentials } = require('./../config/credentials');

const googleCredentials = passportCredentials.strategies.google;

passport.use(new GoogleStrategy({
    clientID: googleCredentials.clientID,
    clientSecret: googleCredentials.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    // callback
    userData = {
        googleId: profile.id,
        username: profile.displayName,
        firstName: profile.name.givenName,
        familyName: profile.name.familyName
    };
    console.log(userData);
    done();
}));