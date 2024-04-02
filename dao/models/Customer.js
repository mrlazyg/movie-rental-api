const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
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
      email: {
        type: String,
        require: false,
        validate: {
          validator: function (v) {
            return /^\w+([\. -]?\w+)*@\w+([\. -]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: 'Please enter a valid email address',
        },
      },
    },
    {
      collection: 'CUSTOMERS',
      versionKey: false,
    }
  )
);

module.exports = Customer;
