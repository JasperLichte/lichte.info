const { defaults } = require('./../../config/env');
const { connection } = require('./../../app');
const QueryHelper = require('./../../db/QueryHelper');
const AppInformation = require('./../../inc/AppInformation');

let activeLanguage = defaults.language;

module.exports = {

    /**
     * /index
     */
    getMain: (req, res) => {
        const clientLanguage = req.acceptsLanguages(defaults.supportedLanguages);
        if (clientLanguage) {
            activeLanguage = clientLanguage;
        }

        res.render('main', {
            title: AppInformation.getViewTitle('Start'),
            lang: activeLanguage
        });
    },

    /**
     * /login
     */
    getLogin: (req, res) => {
        const clientLanguage = req.acceptsLanguages(defaults.supportedLanguages);
        if (clientLanguage) {
            activeLanguage = clientLanguage;
        }
    
        QueryHelper.getStrings(connection, ['LOGIN', 'LOGIN_WITH', 'HELLO', 'YOU_CAN_LOGIN_WITH'], activeLanguage)
            .then(dbStrings => {
                res.render('login', {
                    title: AppInformation.getViewTitle(dbStrings['LOGIN']),
                    lang: activeLanguage,
                    dbStrings: dbStrings
                });
    
            });
    },

    /**
     * /about
     */
    getAbout: (req, res) => {
        const clientLanguage = req.acceptsLanguages(defaults.supportedLanguages);
        if (clientLanguage) {
            activeLanguage = clientLanguage;
        }
    
        res.render('about', {
            title: 'About',
            lang: activeLanguage
        });
    }
};