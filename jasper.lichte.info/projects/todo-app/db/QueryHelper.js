const { defaults } = require('./../config/env');

class QueryHelper {
  /**
   * makes a request to recieve a string from db
   * @param {Connection} conn
   * @param {string} stringId
   * @param {string} language
   * @returns {string}
   */
  static getString(connection = null, stringId = "", language = defaults.language) {
    if (!connection || !stringId) {
      return "";
    }

    connection.query( `
        SELECT string_ID, string
        FROM strings
        WHERE string_ID = ${QueryHelper.quotateString(connection, stringId)}
         AND language = '${language}'
        LIMIT 1
        `, (err, res) => {
            if (err || !res || !res.length) {
                return;
            }
            return res[0].string;
        });
  }

  /**
   * makes a request to recieve an object of indexed strings from db
   * @param {Connection} connection
   * @param {array} stringIds
   * @param {string} language
   * @returns {object}
   */
  static getStrings(connection = null, stringIds = [], language = defaults.language) {
    if (!connection || !stringIds || !stringIds.length) {
      return {};
    }

    return new Promise((resolve, reject) => {
        let strings = {};
        connection.query(`
            SELECT string_ID, string
            FROM strings
            WHERE string_ID IN (${QueryHelper.quotateString(
              connection,
              stringIds
            )})
             AND language = '${language}'
            `, (err, res) => {
            if (err || !res || !res.length) {
                reject();
            }
            res.forEach(set => {
                strings[set.string_ID] = set.string;
            });
            resolve(strings);
        });
    });
  }

  /**
   * quotates and escapes a string     *
   * @param {Connection} connection
   * @param {string} string
   * @returns {string}
   */
  static quotateString(connection = null, string = "") {
    if (!connection || !string) {
      return "";
    }
    return connection.escape(string);
  }

  /**
   * quotates and escapes a string-array
   * @param {Connection} connection
   * @param {array} strings
   * @return {string}
   */
  static quotateStringArray(connection = null, strings = []) {
    if (!connection || !strings || !strings.length) {
      return "";
    }

    strings.map(str => QueryHelper.quotateString(str));
    return strings.join(", ");
  }
}

module.exports = QueryHelper;
