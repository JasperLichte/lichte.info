const { host, defaults } = require('./config/env');
const express = require('express');
const ejs = require('ejs');
const locale = require("locale");
const Connection = require('./db/Connection');
const QueryHelper = require('./db/QueryHelper');

const supportedLangauges = new locale.Locales(['en', 'de', 'es', 'fr'])
let activeLanguage = defaults.language;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(locale(supportedLangauges, defaults.language));

const connection = new Connection();

// Index
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Start',
        lang: activeLanguage
    });
});

// Login
app.get('/login', (req, res) => {
    if (req.locale) {
        activeLanguage = req.locale;
    }
    QueryHelper.getStrings(connection.getConnection(), ['LOGIN', 'LOGIN_WITH', 'HELLO'], activeLanguage)
        .then(dbStrings => {
            res.render('login', {
                title: dbStrings['LOGIN'],
                lang: activeLanguage,
                dbStrings: dbStrings
            });

        });
});

app.listen(host.PORT, (req, res) => {
    console.log(`Listening on ${host.HOST}:${host.PORT}`);
});