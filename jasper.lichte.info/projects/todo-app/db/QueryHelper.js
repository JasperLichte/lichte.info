const { defaults } = require("./../config/env");

class QueryHelper {

  /**
   * makes a request to recieve a string from db
   * @param {Connection} conn
   * @param {string} stringId
   * @param {string} language
   * @returns {Promise}
   */
  static getString(connection = null, stringId = "", language = defaults.language) {
    return new Promise((resolve, reject) => {
      if (!connection || !stringId) {
        resolve('');
        return;
      }
      connection.query(`
          SELECT string_ID, string
          FROM strings
          WHERE string_ID = ${QueryHelper.quotateString(connection, stringId)}
           AND language = '${language}'
          LIMIT 1
          `, (err, res) => {
          if (err || !res || !res.length) {
            resolve(''); return;
          }
          resolve(res[0].string);
        });
    });
  }

  /**
   * makes a request to recieve an object of indexed strings from db
   * @param {Connection} connection
   * @param {array} stringIds
   * @param {string} language
   * @returns {Promise}
   */
  static getStrings(connection = null, stringIds = [], language = defaults.language) {
    return new Promise((resolve, reject) => {
      if (!connection || !stringIds || !stringIds.length) {
        resolve({});
        return;
      }
      let strings = {};
      connection.query(`
        SELECT string_ID, string
        FROM strings
        WHERE string_ID IN (${QueryHelper.quotateString(connection, stringIds)})
         AND language = '${language}'
        `, (err, res) => {
          if (err || !res || !res.length) {
            resolve({});
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

  /**
   * Recieves an array of objects containing the 
   * column name as the key and the value as the value
   * @param {Connection} connection 
   * @param {string} tableName 
   * @param {array} fields 
   * @param {string} condition 
   * @param {int} limit 
   * @param {string} order
   * @returns {Promise}
   */
  static getTableFieldsElements(connection, tableName, fields = [], condition = '', limit = null, order = '') {
    return new Promise((resolve, reject) => {
      if (!connection || !tableName) {
        reject();
        return;
      }
      let query = 'SELECT ';
      // Fields
      query += (Array.isArray(fields) && fields.length ? fields.join(', ') : '*');
      // Table
      query += ' FROM `' + tableName + '` ';
      // Condition
      query += (condition ? 'WHERE ' + condition : '');
      // Sort
      query += (order ? ' ORDER BY ' + order : '');
      // Limit
      query += (limit ? ' LIMIT ' + limit : '');

      // Make request
      connection.query(query, (err, res) => {
        if (err || !res) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  /**
   * Inserts a datset into db table
   * @param {Connection} connection 
   * @param {string} tableName 
   * @param {object} fields 
   * @returns {Promise}
   */
  static insertTableFields(connection, tableName, fields) {
    return new Promise((resolve, reject) => {
      if (!connection || !tableName || !fields) {
        reject();
        return;
      }
      let columns = [];
      let values = [];
      for(let key in fields) {
        columns.push(key);
        values.push(QueryHelper.quotateString(connection, fields[key]));
      }
      columns = '(' + columns.join(', ') + ')';
      values = 'VALUES (' + values.join(', ') + ')'
      let query = 'INSERT INTO `' + tableName + '` ' + columns + ' ' + values + ';';
      connection.query(query, (err, res) => {
        if (err || !res) {
          reject();
          return;
        }
        resolve(res.insertId);
      });
    });
  }
}

module.exports = QueryHelper;
