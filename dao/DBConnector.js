const mongoose = require('mongoose');
const { MONGODB_URI, DB_OPTIONS } = require('../constant');

class DBConnector {
  static async createConnection() {
    /* mongoose.connect() returns a Promise */
    mongoose.connect(MONGODB_URI, DB_OPTIONS, (err) => {
      if (err) {
        console.error('⚠️! Unable to connect to db...', err.message);
        process.exit(1);
      }
      console.log(`Connected to ${DB_OPTIONS.dbName} db...`);
    });
  }
}

module.exports = DBConnector;
