const mysql = require("mysql");
const { db } = require('./../config/env');
const credentials = require('./../config/credentials');

class Connection {
  constructor() {
    this.host = db.HOST;
    this.dbName = db.DB;
    this.dbUser = credentials.db.USER;
    this.dbPassword = credentials.db.PASSWORD;
    this.connection = null;

    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection({
        host: this.host,
        user: this.dbUser,
        password: this.dbPassword,
        database: this.dbName
      });
  
      this.connection.connect(error => {
        if (error) {
          console.error('Error accured connecting to ' + this.host);
          resolve({});
          return;
        }
        console.log('Connected to ' + this.host);
        resolve(this);
      });
    });
  }

  getConnection() {
    return this.connection;
  }

  close() {
    if (!this.connection) return;

    this.connection.end();
  }
}

module.exports = Connection;
