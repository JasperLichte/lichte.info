const { connection } = require('./../app');
const QueryHelper = require('./../db/QueryHelper');

class UserHandler {

    /**
     * @param {object}
     * @param {string} platform
     * @returns {void}
     */
    static createUser({platformId, userName, firstName, familyName, email}, platform) {
        if (!platformId || !userName || !firstName || !familyName || !email || !platform) {
            return;
        }

        QueryHelper.insertTableFields(connection, 'users', {
            email: email,
            familyName: familyName,
            firstName: firstName,
            userName: userName
        }).then(insertId => {
            if (!insertId) {
                return;
            }

            let fields = {
                user_ID: insertId
            };
            fields[platform + '_ID'] = platformId;
            QueryHelper.insertTableFields(connection, 'oauth', fields).then(insertId => {});
        });
    }

    /**
     * @param {string|int} platformId
     * @param {string} platform
     * @returns {Promise}
     */
    static userExists(platformId, platform) {
        return new Promise((resolve, reject) => {
            if (!platformId || !platform) {
                resolve(false);
                return;
            }
    
            QueryHelper.getTableFieldsElements(
                connection, 
                'oauth', 
                ['user_ID'],
                `${UserHandler.getPlatformKey(platform)} = ${platformId}`
            ).then(res => {
                resolve(!!res.length);
            });
        });
    }

    /**
     * @param {string} platform
     * @returns {string}
     */
    static getPlatformKey(platform) {
        return platform + '_ID';
    }
}

module.exports = UserHandler;