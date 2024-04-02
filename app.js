require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/Router');
const genreRouter = require('./routes/Genres');
const customerRouter = require('./routes/Customers');
const movieRouter = require('./routes/Movies');
const rentalRouter = require('./routes/Rentals');
const userRouter = require('./routes/Users');
const auth = require('./routes/Auth');
const DBConnector = require('./dao/DBConnector');
const RedisConnector = require('./dao/RedisConnector');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // initialize body-parser to parse incoming parameters requests to req.body
app.use(cookieParser()); // initialize cookie-parser to allow us access the cookies stored in the browser

/* Use logger in specific env */
if (app.get('env') === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
  console.log('Morgan enabled..');
}

// Route handler
app.use('/', router);
app.use('/api/genres', genreRouter);
app.use('/api/customers', customerRouter);
app.use('/api/movies', movieRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', auth);

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Internal server error' } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await DBConnector.createConnection();
  await RedisConnector.createConnection();
  console.log(`App is listening to port ${PORT}..`);
});
