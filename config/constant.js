module.exports = {
  APP_LOCAL_PORT: 3000,
  MONGODB_URI: process.env.DB_URI,
  DB_OPTIONS: {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  },
  DB_LOCAL_PORT: 27017,
  REDIS_URI: process.env.REDIS_URI,
};
