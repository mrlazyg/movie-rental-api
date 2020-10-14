const mongoose = require('mongoose');
const { genreSchema } = require('./Genre');

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
      },
      /* Hybrid approach */
      genre: {
        type: genreSchema,
        required: true,
      },
      numberInStock: {
        type: Number,
        required: true,
        min: 0,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    },
    {
      collection: 'MOVIES',
      versionKey: false,
    }
  )
);

module.exports = Movie;
