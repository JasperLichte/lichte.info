const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { passport: passportCredentials } = require('./../config/credentials');
const UserHandler = require('./UserHandler');


const googleCredentials = passportCredentials.strategies.google;

passport.use(new GoogleStrategy({
    clientID: googleCredentials.clientID,
    clientSecret: googleCredentials.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    let userData = {
        platformId: profile.id,
        userName: profile.displayName,
        firstName: profile.name.givenName,
        familyName: profile.name.familyName,
        email: profile.emails[0].value
    };

    // Store user to db if not yet available
    UserHandler.userExists(profile.id, 'google')
        .then(userExists => {
            if (!userExists) {
                UserHandler.createUser(userData, 'google');
            }
        });
    done();
}));