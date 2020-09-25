const mongoose = require('mongoose');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      /* genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      release: Date,
      isAvailable: {
        type: Boolean,
        default: false,
      }, */
    },
    {
      collection: 'GENRES',
      versionKey: false,
    }
  )
);

module.exports = Genre;
