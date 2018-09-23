const mysql = require("mysql");

const { db } = require('./../config/env');

class Connection {
  constructor() {
    this.host = db.HOST;
    this.dbName = db.DB;
    this.dbUser = db.USER;
    this.dbPassword = db.PASSWORD;
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
