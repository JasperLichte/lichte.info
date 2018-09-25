const passport = require('passport');

module.exports = {

    /**
     * Login with Google
     * /auth/google
     */
    getGoogle: passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }),

    getGoogleRedirect: (req, res) => {
        res.send('')
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