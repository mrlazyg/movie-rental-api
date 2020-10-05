const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
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
);

const Genre = mongoose.model('Genre', genreSchema);

module.exports = { Genre, genreSchema };
