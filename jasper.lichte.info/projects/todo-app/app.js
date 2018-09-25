const Connection = require('./db/Connection');
const { host, defaults } = require('./config/env');
const express = require('express');
const app = express();

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
    // Path to static
    app.use(express.static('static'));
    // View engine
    app.set('view engine', 'ejs');
    // Routes
    app.use('/', require('./routes/routes'));
    
    app.listen(host.PORT, (req, res) => {
        console.log(`Listening on ${host.HOST}:${host.PORT}`);
    });
}