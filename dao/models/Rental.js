const mongoose = require('mongoose');

const Rental = mongoose.model(
  'Rental',
  new mongoose.Schema(
    {
      customer: {
        type: new mongoose.Schema({
          name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
          },
          isGold: {
            type: Boolean,
            default: false,
          },
          phone: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 13,
          },
        }),
        required: true,
      },
      movie: {
        type: new mongoose.Schema({
          name: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 50,
          },
          dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
          },
        }),
        required: true,
      },
      dateOut: {
        type: Date,
        required: true,
        default: Date.now,
      },
      dateReturned: {
        type: Date,
      },
      rentalFee: {
        type: Number,
        min: 0,
      },
    },
    {
      collection: 'RENTALS',
      versionKey: false,
    }
  )
);

module.exports = Rental;
