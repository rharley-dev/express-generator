const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); // load the new currency type into mongoose to be used in schema's
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // storing a reference field through the user doc with mongoose population
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

// instanciating new object, campsiteSchema
const campsiteSchema = new Schema(
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
    elevation: {
      type: Number,
      required: true,
    },
    cost: {
      type: Currency,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true, // auto add two properties (created at: and updated at: )
  }
);

const Campsite = mongoose.model('Campsite', campsiteSchema); // returns a constructor function, similar to classes

module.exports = Campsite;
