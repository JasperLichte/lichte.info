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
        if (req.user) {
            res.redirect('/dashboard');
            return;
        }
        res.redirect('login');
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