module.exports = {
  PORT: 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/',
  DB_OPTIONS: {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'DEV_DB',
  },
  DB_NAME: 'DEV_DB',
  DB_PORT: 27017,
};
