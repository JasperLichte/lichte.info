const passport = require('passport');

module.exports = {

    /**
     * Login with Google
     * /auth/google
     */
    getGoogle: passport.authenticate('google', {
        scope: ['profile']
    }),

    getGoogleRedirect: (req, res) => {
        res.send('hu')
    },

    /**
     * Login with Facebook
     * /auth/facebook
     */
    getFacebook: (req, res) => {
        res.send('in progress');
    },

    /**
     * Login with GitHub
     * /auth/github
     */
    getGitHub: (req, res) => {
        res.send('in progress');
    }

};