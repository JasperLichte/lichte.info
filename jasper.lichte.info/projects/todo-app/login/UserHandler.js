const { connection }        = require('./../app');
const QueryHelper           = require('./../db/QueryHelper');

class UserHandler {

    /**
     * @param {object}
     * @param {string} platform
     * @returns {void}
     */
    static createUser({platformId, userName, firstName, familyName, email}, platform) {
        return new Promise((resolve, reject) => {
            if (!(platformId && userName && firstName && familyName && email && platform)) {
                resolve(0);
                return;
            }
    
            QueryHelper.insertTableFields(connection, 'users', {
                email: email,
                familyName: familyName,
                firstName: firstName,
                userName: userName,
                registered: (new Date())
            }).then(insertId => {
                if (!insertId) {
                    resolve(0);
                    return;
                }
    
                let fields = {
                    user_ID: insertId
                };
                fields[UserHandler.getPlatformKey(platform)] = platformId;
                QueryHelper.insertTableFields(connection, 'oauth', fields).then(insertId => {});
                resolve(insertId);
            });
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
                resolve(0);
                return;
            }
    
            QueryHelper.getTableFieldsElements(
                connection, 
                'oauth', 
                ['user_ID'],
                `${UserHandler.getPlatformKey(platform)} = ${platformId}`,
                1
            ).then(res => {
                if (!res.length || !res[0] || !res[0].user_ID) {
                    resolve(0);
                    return;
                }
                resolve(res[0].user_ID);
            });
        });
    }

    /** 
     * @param {int} user_ID
     * @returns {Promise} 
     */
    static getUserById(user_ID) {
        return new Promise((resolve, reject) => {
            if (!user_ID) {
                resolve({});
                return;
            }
            QueryHelper.getTableFieldsElements(
                connection,
                'users',
                ['user_ID', 'email', 'userName', 'firstName', 'familyName'],
                `user_ID = ${parseInt(user_ID)}`,
                1
            ).then((res, err) => {
                if (err || !res || !res[0]) {
                    resolve({});
                    return;
                }
                resolve(res[0]);
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