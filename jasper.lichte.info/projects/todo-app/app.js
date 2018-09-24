const Connection = require('./db/Connection');
const { host, defaults } = require('./config/env');
const express = require('express');
const app = express();

let connection = null;

// Connect to db, export connection and setup the app
(new Connection()).then(conn => {
    module.exports = conn;
    connection = conn;
    appSetup();
});

/**
 * @requires './routes/routes'
 * @returns {void}
 */
function appSetup() {
    // Path to static
    app.use(express.static('static'));
    // routes
    app.use('/', require('./routes/routes'));
    // View engine
    app.set('view engine', 'ejs');
    
    app.listen(host.PORT, (req, res) => {
        console.log(`Listening on ${host.HOST}:${host.PORT}`);
    });
}