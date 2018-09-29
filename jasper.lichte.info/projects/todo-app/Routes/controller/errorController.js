const { defaults }          = require('./../../config/env');
const QueryHelper           = require('./../../db/QueryHelper');
const { connection }        = require('./../../app');

let activeLanguage = defaults.language;

module.exports = {
    /**
     * General error
     */
    getError: (req, res) => {
        res.render('errors/error');
    },

    /**
     * Route not found
     */
    get404: (req, res) => {
        const clientLanguage = req.acceptsLanguages(defaults.supportedLanguages);
        if (clientLanguage) {
            activeLanguage = clientLanguage;
        }
    
        QueryHelper.getStrings(connection, [], activeLanguage)
            .then(dbStrings => {
                res.render('errors/404', {
                    title: dbStrings['LOGIN'],
                    lang: activeLanguage,
                    dbStrings: dbStrings
                });
    
            }).catch(error => {
                console.error(error);
            });
    }
};