const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); // load the new currency type into mongoose to be used in schema's
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Currency,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // auto add two properties (created at: and updated at: )
  }
);

const Promotion = mongoose.model('Promotion', promotionSchema); // returns a constructor function, similar to classes

module.exports = Promotion;
