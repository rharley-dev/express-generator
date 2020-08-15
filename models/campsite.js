const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      type: String,
      required: true,
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
    comments: [commentSchema],
  },
  {
    timestamps: true, // auto add two properties (created at: and updated at: )
  }
);

const Campsite = mongoose.model('Campsite', campsiteSchema); // returns a constructor function, similar to classes

module.exports = Campsite;
