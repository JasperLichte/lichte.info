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

    // If User doesnt already exists in db,
    // Create new User and call done on it
    //
    // Else get the user from db and call done on it
    UserHandler.userExists(userData.platformId, 'google')
    .then(userID => {
        if (!userID) {
            UserHandler.createUser(userData, 'google')
                .then(res => {
                    done(null, {
                        //user_ID: @TODO,
                        email: userData.email,
                        userName: userData.userName,
                        firstName: userData.firstName,
                        familyName: userData.familyName
                    });
                });
        } else {
            // Get Existing user by Id
            UserHandler.getUserById(userID)
                .then(user => {
                    done(null, user)
                });
        }
    });
}));