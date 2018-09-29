const { defaults }          = require('./../../config/env');
const { connection }        = require('./../../app');
const QueryHelper           = require('./../../db/QueryHelper');
const AppInformation        = require('./../../inc/AppInformation');

let activeLanguage = defaults.language;

module.exports = {
    getDashboard: (req, res) => {
        if (!req.user) {
            res.redirect('/login');
            return;
        }

        const clientLanguage = req.acceptsLanguages(defaults.supportedLanguages);
        activeLanguage = (clientLanguage ? clientLanguage : activeLanguage);

        const neededStrings = ['WELCOME', 'TITLE', 'DESCRIPTION', 'SETTINGS', 'LOGOUT'];
    
        QueryHelper.getStrings(connection, neededStrings, activeLanguage)
            .then(dbStrings => {
                res.render('dashboard', {
                    title: AppInformation.getViewTitle('Dashboard'),
                    lang: activeLanguage,
                    user: req.user,
                    dbStrings: dbStrings
                });    
            });
    }
};
