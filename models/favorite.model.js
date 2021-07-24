const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteMusicSchema = mongoose.Schema({
  listSongs: [String],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { versionKey: false });

const FavoriteMusic = mongoose.model('FavoriteMusic', favoriteMusicSchema);
module.exports = FavoriteMusic;
