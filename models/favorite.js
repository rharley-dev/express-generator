const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      // storing a reference field through the user doc with mongoose population
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    campsites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Campsite'
    },
  },
  {
    timestamps: true,
  }
);

// returns a constructor function, similar to classes
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;