const Connection        = require('./db/Connection');
const { host }          = require('./config/env');
const credentials       = require('./config/credentials');
const cookieSession     = require('cookie-session');
const passport          = require('passport');
const bodyParser        = require('body-parser');
const express           = require('express');

// Connect to db, export connection and setup the app
(new Connection())
    .then(connection => {
        // Export Connection
        module.exports = connection;
        appSetup();
    })

/**
 * @requires './routes/routes'
 * @returns {void}
 */
function appSetup() {
    const app = express();

    // Path to static
    app.use(express.static('static'));

    // Cookie-Session
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: credentials.cookieSession.keys
    }));
    
    // Setup passport for use with Cookie-Session
    app.use(passport.initialize());
    app.use(passport.session());

    // Body-Parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // View engine
    app.set('view engine', 'ejs');

    // Routes
    app.use('/', require('./routes/routes'));
    
    // Start listening for requests
    app.listen(host.PORT, (req, res) => {
        console.log(`Listening on ${host.HOST}:${host.PORT}`);
    });
}