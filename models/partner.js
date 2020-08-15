const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnerSchema = new Schema(
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
  },
  {
    timestamps: true, // auto add two properties (created at: and updated at: )
  }
);

const Partner = mongoose.model('Partner', partnerSchema); // returns a constructor function, similar to classes

module.exports = Partner;