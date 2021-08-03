const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// modelo de la coleccion lista de favoritos

const favoriteMusicSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  listSongs: [String],

}, { versionKey: false });

const FavoriteMusic = mongoose.model('FavoriteMusic', favoriteMusicSchema);
module.exports = FavoriteMusic;
