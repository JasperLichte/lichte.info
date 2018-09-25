const { app: appDefaults } = require('./../config/env');

class AppInformation {

    /**
     * @param {string} viewName
     * @returns {string}
     */
    static getViewTitle(viewName = '') {
        if (!viewName) {
            return appDefaults.name;
        }

        return appDefaults.title + ' | ' + viewName;
    }

}

module.exports = AppInformation;
