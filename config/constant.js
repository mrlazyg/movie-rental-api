module.exports = {
  APP_PORT: 3000,
  MONGODB_URI: process.env.DB_URI || 'mongodb://user:password@localhost:27017/?authSource=DB_NAME',
  DB_OPTIONS: {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME || 'LOCAL',
  },
  DB_PORT: 27017,
};

//TODO: Always remove the server url
