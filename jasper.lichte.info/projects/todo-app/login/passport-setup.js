const passport                              = require("passport");
const GoogleStrategy                        = require("passport-google-oauth20");
const { passport: passportCredentials }     = require("./../config/credentials");
const UserHandler                           = require("./UserHandler");

const googleCredentials                     = passportCredentials.strategies.google;

passport.serializeUser((user, done) => {
    done(null, user.user_ID);
});
passport.deserializeUser((userID, done) => {
    UserHandler.getUserById(userID)
        .then(user => {
            done(null, user);
        });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleCredentials.clientID,
      clientSecret: googleCredentials.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      let userData = {
        platformId: profile.id,
        userName: profile.displayName,
        firstName: profile.name.givenName,
        familyName: profile.name.familyName,
        email: profile.emails[0].value
      };

      UserHandler.userExists(userData.platformId, "google").then(userID => {
        if (!userID) {
          UserHandler.createUser(userData, "google")
            .then(userID => {
                done(null, {
                    user_ID: userID,
                    email: userData.email,
                    userName: userData.userName,
                    firstName: userData.firstName,
                    familyName: userData.familyName
                });
            });
        } else {
          UserHandler.getUserById(userID).then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
